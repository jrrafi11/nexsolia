import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';

export interface ProductItem {
  id: number;
  original_id?: number;
  name: string;
  slug: string;
  type?: string;
  sku?: string;
  price: number;
  regular_price: number;
  sale_price?: number | null;
  currency_symbol?: string;
  on_sale?: boolean;
  discount_percent?: number;
  in_stock: boolean;
  stock_count: number;
  stock_text?: string;
  primary_image: string;
  hover_image?: string;
  gallery: string[];
  categories: { id: number; name: string; slug: string }[];
  brands: { id: number; name: string; slug: string }[];
  short_description?: string;
  description?: string;
  attributes?: { name: string; options: string[] }[];
  created_at?: string;
  updated_at?: string;
}

export interface OrderItem {
  product_id: number;
  name: string;
  slug: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: number;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  shipping_address: string;
  city: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  total_amount: number;
  payment_method: string;
  notes?: string;
  items: OrderItem[];
  created_at: string;
  updated_at: string;
}

const PRODUCTS_STORE_PATH = path.join(process.cwd(), 'src', 'data', 'products-store.json');
const ORDERS_STORE_PATH = path.join(process.cwd(), 'src', 'data', 'orders-store.json');
const CATALOG_LITE_PATH = path.join(process.cwd(), 'src', 'data', 'aura-catalog-lite.json');
const CATALOG_DETAILS_PATH = path.join(process.cwd(), 'src', 'data', 'aura-product-details.json');

// Initialize PG Pool
let pool: Pool | null = null;
let pgConnected = false;
let initPromise: Promise<void> | null = null;

function getPool(): Pool | null {
  if (pool) return pool;
  const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/nexsolia_db';
  try {
    pool = new Pool({
      connectionString,
      connectionTimeoutMillis: 1500,
      idleTimeoutMillis: 5000,
    });
    // Prevent unhandled errors from crashing the Node runtime
    pool.on('error', () => {});
    return pool;
  } catch {
    return null;
  }
}

// Check PG connection and init tables
export async function initDatabase(): Promise<{ isPostgres: boolean; message: string }> {
  const p = getPool();
  if (!p) {
    initLocalStore();
    return { isPostgres: false, message: 'Running on local persistent JSON store (PostgreSQL connection string unconfigured).' };
  }

  // Gracefully catch connection failure so AggregateError never bubbles to React 19's serializer
  const client = await p.connect().catch(() => null);
  if (!client) {
    pgConnected = false;
    initLocalStore();
    return {
      isPostgres: false,
      message: 'PostgreSQL offline or unreachable. Using high-performance synchronized local storage mode.',
    };
  }

  try {
    pgConnected = true;

    // Create tables
    await client.query(`
      CREATE TABLE IF NOT EXISTS nexsolia_products (
        id SERIAL PRIMARY KEY,
        original_id INTEGER,
        name TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        type TEXT DEFAULT 'simple',
        sku TEXT,
        price NUMERIC(12, 2) DEFAULT 0,
        regular_price NUMERIC(12, 2) DEFAULT 0,
        sale_price NUMERIC(12, 2),
        currency_symbol VARCHAR(10) DEFAULT '৳',
        on_sale BOOLEAN DEFAULT false,
        discount_percent INTEGER DEFAULT 0,
        in_stock BOOLEAN DEFAULT true,
        stock_count INTEGER DEFAULT 10,
        stock_text TEXT DEFAULT 'In stock',
        primary_image TEXT,
        hover_image TEXT,
        gallery JSONB DEFAULT '[]'::jsonb,
        categories JSONB DEFAULT '[]'::jsonb,
        brands JSONB DEFAULT '[]'::jsonb,
        short_description TEXT,
        description TEXT,
        attributes JSONB DEFAULT '[]'::jsonb,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS nexsolia_orders (
        id SERIAL PRIMARY KEY,
        order_number TEXT UNIQUE NOT NULL,
        customer_name TEXT NOT NULL,
        customer_phone TEXT NOT NULL,
        customer_email TEXT,
        shipping_address TEXT NOT NULL,
        city TEXT DEFAULT 'Dhaka',
        status TEXT DEFAULT 'pending',
        total_amount NUMERIC(12, 2) NOT NULL DEFAULT 0,
        payment_method TEXT DEFAULT 'Cash on Delivery',
        notes TEXT,
        items JSONB NOT NULL DEFAULT '[]'::jsonb,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);

    // Check count
    const res = await client.query('SELECT COUNT(*) FROM nexsolia_products');
    const count = parseInt(res.rows[0].count, 10);
    if (count === 0) {
      await seedPostgres(client);
    }

    client.release();
    return { isPostgres: true, message: 'Connected to PostgreSQL database successfully.' };
  } catch (err: unknown) {
    try {
      client.release();
    } catch {}
    pgConnected = false;
    initLocalStore();
    const errMsg = err instanceof Error ? err.message : String(err);
    return {
      isPostgres: false,
      message: `PostgreSQL offline (${errMsg}). Using high-performance synchronized local storage mode.`,
    };
  }
}

async function seedPostgres(client: any) {
  const products = loadCatalogMerged();
  for (const p of products) {
    await client.query(
      `INSERT INTO nexsolia_products (
        original_id, name, slug, type, sku, price, regular_price, sale_price,
        currency_symbol, on_sale, discount_percent, in_stock, stock_count, stock_text,
        primary_image, hover_image, gallery, categories, brands,
        short_description, description, attributes
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22)
      ON CONFLICT (slug) DO NOTHING`,
      [
        p.id,
        p.name,
        p.slug,
        p.type || 'simple',
        p.sku || '',
        p.price || 0,
        p.regular_price || p.price || 0,
        p.sale_price || null,
        p.currency_symbol || '৳',
        p.on_sale || false,
        p.discount_percent || 0,
        p.in_stock ?? true,
        p.stock_count ?? 15,
        p.stock_text || (p.in_stock ? 'In stock' : 'Out of stock'),
        p.primary_image || '',
        p.hover_image || '',
        JSON.stringify(p.gallery || []),
        JSON.stringify(p.categories || []),
        JSON.stringify(p.brands || []),
        p.short_description || '',
        p.description || '',
        JSON.stringify(p.attributes || []),
      ]
    );
  }

  const sampleOrders = getInitialOrders(products);
  for (const o of sampleOrders) {
    await client.query(
      `INSERT INTO nexsolia_orders (
        order_number, customer_name, customer_phone, customer_email,
        shipping_address, city, status, total_amount, payment_method, notes, items, created_at, updated_at
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
      ON CONFLICT (order_number) DO NOTHING`,
      [
        o.order_number,
        o.customer_name,
        o.customer_phone,
        o.customer_email,
        o.shipping_address,
        o.city,
        o.status,
        o.total_amount,
        o.payment_method,
        o.notes,
        JSON.stringify(o.items),
        o.created_at,
        o.updated_at,
      ]
    );
  }
}

// Local Store Management
function loadCatalogMerged(): ProductItem[] {
  let liteItems: any[] = [];
  let detailMap: Record<number, any> = {};

  try {
    if (fs.existsSync(CATALOG_LITE_PATH)) {
      const data = JSON.parse(fs.readFileSync(CATALOG_LITE_PATH, 'utf-8'));
      liteItems = data.products || [];
    }
  } catch (e) {
    console.error('Error reading lite catalog:', e);
  }

  try {
    if (fs.existsSync(CATALOG_DETAILS_PATH)) {
      detailMap = JSON.parse(fs.readFileSync(CATALOG_DETAILS_PATH, 'utf-8'));
    }
  } catch (e) {
    console.error('Error reading details catalog:', e);
  }

  return liteItems.map((item, idx) => {
    const detail = detailMap[item.id] || {};
    const stockQty = Math.floor(Math.abs(Math.sin(item.id || idx)) * 40) + 3;
    const inStock = item.in_stock !== false && stockQty > 0;

    return {
      id: item.id || idx + 1,
      original_id: item.id,
      name: item.name,
      slug: item.slug,
      type: item.type || 'simple',
      sku: item.sku || `NEX-AURA-${item.id || idx + 1}`,
      price: item.price || 0,
      regular_price: item.regular_price || item.price || 0,
      sale_price: item.sale_price || null,
      currency_symbol: '৳',
      on_sale: !!item.on_sale,
      discount_percent: item.discount_percent || 0,
      in_stock: inStock,
      stock_count: stockQty,
      stock_text: inStock ? 'In stock' : 'Out of stock',
      primary_image: item.primary_image || '',
      hover_image: item.hover_image || item.primary_image || '',
      gallery: detail.gallery && detail.gallery.length > 0 ? detail.gallery : [item.primary_image].filter(Boolean),
      categories: item.categories || [],
      brands: item.brands || [],
      short_description: detail.short_description || `High-performance smart automation device engineered for Nexsolia smart ecosystem integration.`,
      description: detail.description || `<p>${item.name} delivers precision engineering, intelligent control, and seamless integration into modern smart residential and commercial spaces.</p>`,
      attributes: detail.attributes || [],
      created_at: new Date(Date.now() - (431 - idx) * 3600000 * 4).toISOString(),
      updated_at: new Date().toISOString(),
    };
  });
}

function getInitialOrders(products: ProductItem[]): Order[] {
  const p1 = products[0] || { id: 1, name: 'Smart Switch 2-Gang', slug: 'smart-switch', price: 4500, primary_image: '' };
  const p2 = products[1] || { id: 2, name: 'Intelligent Gateway Hub', slug: 'smart-hub', price: 12500, primary_image: '' };
  const p3 = products[2] || { id: 3, name: 'Curtain Motor Zigbee', slug: 'curtain-motor', price: 8900, primary_image: '' };

  return [
    {
      id: 1,
      order_number: 'NEX-1049',
      customer_name: 'Tanvir Hossain',
      customer_phone: '+880 1711-234567',
      customer_email: 'tanvir.h@gmail.com',
      shipping_address: 'House 42, Road 11, Block D, Banani',
      city: 'Dhaka',
      status: 'processing',
      total_amount: p1.price * 2 + p2.price,
      payment_method: 'Cash on Delivery',
      notes: 'Please call before delivery. Deliver after 4:00 PM.',
      items: [
        { product_id: p1.id, name: p1.name, slug: p1.slug, price: p1.price, quantity: 2, image: p1.primary_image },
        { product_id: p2.id, name: p2.name, slug: p2.slug, price: p2.price, quantity: 1, image: p2.primary_image },
      ],
      created_at: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
      updated_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    },
    {
      id: 2,
      order_number: 'NEX-1048',
      customer_name: 'Dr. Shahriar Rahman',
      customer_phone: '+880 1819-987654',
      customer_email: 'shahriar.doc@yahoo.com',
      shipping_address: 'Apartment 7B, Concord Tower, Gulshan-2',
      city: 'Dhaka',
      status: 'pending',
      total_amount: p3.price * 3,
      payment_method: 'bKash / Nagad',
      notes: 'Urgent installation needed for duplex residence.',
      items: [
        { product_id: p3.id, name: p3.name, slug: p3.slug, price: p3.price, quantity: 3, image: p3.primary_image },
      ],
      created_at: new Date(Date.now() - 1000 * 60 * 480).toISOString(),
      updated_at: new Date(Date.now() - 1000 * 60 * 480).toISOString(),
    },
    {
      id: 3,
      order_number: 'NEX-1047',
      customer_name: 'Farzana Karim',
      customer_phone: '+880 1912-345678',
      customer_email: 'farzana.karim@outlook.com',
      shipping_address: 'Plot 15, Sector 7, Uttara Model Town',
      city: 'Dhaka',
      status: 'completed',
      total_amount: p2.price + p1.price,
      payment_method: 'Bank Transfer',
      notes: 'Successfully installed and commissioned by Nexsolia tech team.',
      items: [
        { product_id: p2.id, name: p2.name, slug: p2.slug, price: p2.price, quantity: 1, image: p2.primary_image },
        { product_id: p1.id, name: p1.name, slug: p1.slug, price: p1.price, quantity: 1, image: p1.primary_image },
      ],
      created_at: new Date(Date.now() - 1000 * 60 * 1440 * 2).toISOString(),
      updated_at: new Date(Date.now() - 1000 * 60 * 1440).toISOString(),
    },
    {
      id: 4,
      order_number: 'NEX-1046',
      customer_name: 'Nayeem Chowdhury',
      customer_phone: '+880 1610-882244',
      customer_email: 'nayeem.c@chittagong.net',
      shipping_address: 'Nasirabad Housing Society, Road 3',
      city: 'Chittagong',
      status: 'completed',
      total_amount: p1.price * 4,
      payment_method: 'Cash on Delivery',
      notes: 'Courier delivery via Sundarban.',
      items: [
        { product_id: p1.id, name: p1.name, slug: p1.slug, price: p1.price, quantity: 4, image: p1.primary_image },
      ],
      created_at: new Date(Date.now() - 1000 * 60 * 1440 * 4).toISOString(),
      updated_at: new Date(Date.now() - 1000 * 60 * 1440 * 3).toISOString(),
    },
    {
      id: 5,
      order_number: 'NEX-1045',
      customer_name: 'Mahmudul Hasan',
      customer_phone: '+880 1715-443322',
      customer_email: 'm.hasan@nextech.com.bd',
      shipping_address: 'Dhanmondi 27, House 19',
      city: 'Dhaka',
      status: 'cancelled',
      total_amount: p3.price,
      payment_method: 'Cash on Delivery',
      notes: 'Customer changed product model preference to 4-gang zigbee switch.',
      items: [
        { product_id: p3.id, name: p3.name, slug: p3.slug, price: p3.price, quantity: 1, image: p3.primary_image },
      ],
      created_at: new Date(Date.now() - 1000 * 60 * 1440 * 6).toISOString(),
      updated_at: new Date(Date.now() - 1000 * 60 * 1440 * 5).toISOString(),
    },
  ];
}

export function initLocalStore() {
  let products: ProductItem[] = [];
  if (!fs.existsSync(PRODUCTS_STORE_PATH)) {
    products = loadCatalogMerged();
    fs.writeFileSync(PRODUCTS_STORE_PATH, JSON.stringify(products, null, 2), 'utf-8');
  } else {
    try {
      products = JSON.parse(fs.readFileSync(PRODUCTS_STORE_PATH, 'utf-8'));
    } catch {
      products = loadCatalogMerged();
    }
  }

  if (!fs.existsSync(ORDERS_STORE_PATH)) {
    const orders = getInitialOrders(products);
    fs.writeFileSync(ORDERS_STORE_PATH, JSON.stringify(orders, null, 2), 'utf-8');
  }
}

function readLocalProducts(): ProductItem[] {
  if (!fs.existsSync(PRODUCTS_STORE_PATH)) {
    initLocalStore();
  }
  try {
    const content = fs.readFileSync(PRODUCTS_STORE_PATH, 'utf-8');
    return JSON.parse(content);
  } catch (e) {
    console.error('Error reading products store:', e);
    return [];
  }
}

function writeLocalProducts(products: ProductItem[]) {
  fs.writeFileSync(PRODUCTS_STORE_PATH, JSON.stringify(products, null, 2), 'utf-8');
}

function readLocalOrders(): Order[] {
  if (!fs.existsSync(ORDERS_STORE_PATH)) {
    initLocalStore();
  }
  try {
    const content = fs.readFileSync(ORDERS_STORE_PATH, 'utf-8');
    return JSON.parse(content);
  } catch (e) {
    console.error('Error reading orders store:', e);
    return [];
  }
}

function writeLocalOrders(orders: Order[]) {
  fs.writeFileSync(ORDERS_STORE_PATH, JSON.stringify(orders, null, 2), 'utf-8');
}

// Ensure init runs once
async function ensureInit() {
  if (!initPromise) {
    initPromise = initDatabase().then(() => {});
  }
  await initPromise;
}

// ==========================================
// PUBLIC DATABASE ACCESS METHODS
// ==========================================

export async function getDbStatus(): Promise<{
  connected: boolean;
  engine: 'postgres' | 'local_store';
  productCount: number;
  orderCount: number;
}> {
  await ensureInit();
  if (pgConnected && pool) {
    try {
      const pRes = await pool.query('SELECT COUNT(*) FROM nexsolia_products');
      const oRes = await pool.query('SELECT COUNT(*) FROM nexsolia_orders');
      return {
        connected: true,
        engine: 'postgres',
        productCount: parseInt(pRes.rows[0].count, 10),
        orderCount: parseInt(oRes.rows[0].count, 10),
      };
    } catch {
      // Fallback
    }
  }

  const prods = readLocalProducts();
  const ords = readLocalOrders();
  return {
    connected: false,
    engine: 'local_store',
    productCount: prods.length,
    orderCount: ords.length,
  };
}

export async function getProducts(params?: {
  search?: string;
  category?: string;
  brand?: string;
  stock?: string;
  page?: number;
  limit?: number;
}): Promise<{ products: ProductItem[]; total: number; page: number; totalPages: number }> {
  await ensureInit();

  const page = Math.max(1, params?.page || 1);
  const limit = Math.max(1, params?.limit || 20);

  if (pgConnected && pool) {
    try {
      let conditions: string[] = [];
      let values: any[] = [];
      let idx = 1;

      if (params?.search) {
        conditions.push(`(name ILIKE $${idx} OR sku ILIKE $${idx} OR slug ILIKE $${idx})`);
        values.push(`%${params.search}%`);
        idx++;
      }

      if (params?.stock === 'in_stock') {
        conditions.push(`in_stock = true`);
      } else if (params?.stock === 'out_of_stock') {
        conditions.push(`in_stock = false`);
      }

      const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
      const countRes = await pool.query(`SELECT COUNT(*) FROM nexsolia_products ${whereClause}`, values);
      const total = parseInt(countRes.rows[0].count, 10);

      const offset = (page - 1) * limit;
      values.push(limit, offset);
      const dataRes = await pool.query(
        `SELECT * FROM nexsolia_products ${whereClause} ORDER BY id ASC LIMIT $${idx} OFFSET $${idx + 1}`,
        values
      );

      return {
        products: dataRes.rows.map((r: any) => ({
          ...r,
          price: Number(r.price),
          regular_price: Number(r.regular_price),
          sale_price: r.sale_price ? Number(r.sale_price) : null,
          gallery: typeof r.gallery === 'string' ? JSON.parse(r.gallery) : r.gallery,
          categories: typeof r.categories === 'string' ? JSON.parse(r.categories) : r.categories,
          brands: typeof r.brands === 'string' ? JSON.parse(r.brands) : r.brands,
          attributes: typeof r.attributes === 'string' ? JSON.parse(r.attributes) : r.attributes,
        })),
        total,
        page,
        totalPages: Math.ceil(total / limit),
      };
    } catch (err) {
      console.warn('PG query failed, falling back to local store:', err);
    }
  }

  // Local Store Query
  let items = readLocalProducts();

  if (params?.search) {
    const s = params.search.toLowerCase();
    items = items.filter(
      (p) =>
        p.name.toLowerCase().includes(s) ||
        (p.sku && p.sku.toLowerCase().includes(s)) ||
        p.slug.toLowerCase().includes(s)
    );
  }

  if (params?.category) {
    const catSlug = params.category.toLowerCase();
    items = items.filter((p) => p.categories?.some((c) => c.slug.toLowerCase() === catSlug || c.name.toLowerCase() === catSlug));
  }

  if (params?.brand) {
    const brandSlug = params.brand.toLowerCase();
    items = items.filter((p) => p.brands?.some((b) => b.slug.toLowerCase() === brandSlug || b.name.toLowerCase() === brandSlug));
  }

  if (params?.stock === 'in_stock') {
    items = items.filter((p) => p.in_stock);
  } else if (params?.stock === 'out_of_stock') {
    items = items.filter((p) => !p.in_stock);
  }

  const total = items.length;
  const offset = (page - 1) * limit;
  const paginated = items.slice(offset, offset + limit);

  return {
    products: paginated,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
}

export async function getProductById(id: number | string): Promise<ProductItem | null> {
  await ensureInit();
  const numId = Number(id);

  if (pgConnected && pool) {
    try {
      const res = await pool.query('SELECT * FROM nexsolia_products WHERE id = $1 LIMIT 1', [numId]);
      if (res.rows.length > 0) {
        const r = res.rows[0];
        return {
          ...r,
          price: Number(r.price),
          regular_price: Number(r.regular_price),
          sale_price: r.sale_price ? Number(r.sale_price) : null,
          gallery: typeof r.gallery === 'string' ? JSON.parse(r.gallery) : r.gallery,
          categories: typeof r.categories === 'string' ? JSON.parse(r.categories) : r.categories,
          brands: typeof r.brands === 'string' ? JSON.parse(r.brands) : r.brands,
          attributes: typeof r.attributes === 'string' ? JSON.parse(r.attributes) : r.attributes,
        };
      }
    } catch {
      // Fallback
    }
  }

  const items = readLocalProducts();
  return items.find((p) => p.id === numId || String(p.id) === String(id)) || null;
}

export async function getProductBySlug(slug: string): Promise<ProductItem | null> {
  await ensureInit();
  const normalizedSlug = slug.toLowerCase().trim();

  if (pgConnected && pool) {
    try {
      const res = await pool.query('SELECT * FROM nexsolia_products WHERE slug = $1 LIMIT 1', [normalizedSlug]);
      if (res.rows.length > 0) {
        const r = res.rows[0];
        return {
          ...r,
          price: Number(r.price),
          regular_price: Number(r.regular_price),
          sale_price: r.sale_price ? Number(r.sale_price) : null,
          gallery: typeof r.gallery === 'string' ? JSON.parse(r.gallery) : r.gallery,
          categories: typeof r.categories === 'string' ? JSON.parse(r.categories) : r.categories,
          brands: typeof r.brands === 'string' ? JSON.parse(r.brands) : r.brands,
          attributes: typeof r.attributes === 'string' ? JSON.parse(r.attributes) : r.attributes,
        };
      }
    } catch {
      // Fallback
    }
  }

  const items = readLocalProducts();
  return items.find((p) => p.slug.toLowerCase() === normalizedSlug) || null;
}

export async function createProduct(data: Partial<ProductItem>): Promise<ProductItem> {
  await ensureInit();

  const items = readLocalProducts();
  const newId = items.length > 0 ? Math.max(...items.map((p) => p.id)) + 1 : 1;
  const slug = (data.slug || data.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || `product-${newId}`).replace(/^-+|-+$/g, '');

  const newProduct: ProductItem = {
    id: newId,
    original_id: newId,
    name: data.name || 'New Smart Product',
    slug,
    type: data.type || 'simple',
    sku: data.sku || `NEX-${newId}`,
    price: Number(data.price) || 0,
    regular_price: Number(data.regular_price) || Number(data.price) || 0,
    sale_price: data.sale_price ? Number(data.sale_price) : null,
    currency_symbol: data.currency_symbol || '৳',
    on_sale: !!data.on_sale,
    discount_percent: data.discount_percent || 0,
    in_stock: data.in_stock ?? true,
    stock_count: Number(data.stock_count) ?? 10,
    stock_text: (data.in_stock ?? true) ? 'In stock' : 'Out of stock',
    primary_image: data.primary_image || '',
    hover_image: data.hover_image || data.primary_image || '',
    gallery: data.gallery || (data.primary_image ? [data.primary_image] : []),
    categories: data.categories || [],
    brands: data.brands || [],
    short_description: data.short_description || '',
    description: data.description || '',
    attributes: data.attributes || [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  // Save to local store
  items.unshift(newProduct);
  writeLocalProducts(items);

  // If PG connected, also insert to PG
  if (pgConnected && pool) {
    try {
      await pool.query(
        `INSERT INTO nexsolia_products (
          id, original_id, name, slug, type, sku, price, regular_price, sale_price,
          currency_symbol, on_sale, discount_percent, in_stock, stock_count, stock_text,
          primary_image, hover_image, gallery, categories, brands,
          short_description, description, attributes, created_at, updated_at
        ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25)`,
        [
          newProduct.id,
          newProduct.original_id,
          newProduct.name,
          newProduct.slug,
          newProduct.type,
          newProduct.sku,
          newProduct.price,
          newProduct.regular_price,
          newProduct.sale_price,
          newProduct.currency_symbol,
          newProduct.on_sale,
          newProduct.discount_percent,
          newProduct.in_stock,
          newProduct.stock_count,
          newProduct.stock_text,
          newProduct.primary_image,
          newProduct.hover_image,
          JSON.stringify(newProduct.gallery),
          JSON.stringify(newProduct.categories),
          JSON.stringify(newProduct.brands),
          newProduct.short_description,
          newProduct.description,
          JSON.stringify(newProduct.attributes),
          newProduct.created_at,
          newProduct.updated_at,
        ]
      );
    } catch (e) {
      console.warn('PG insert error:', e);
    }
  }

  return newProduct;
}

export async function updateProduct(id: number | string, data: Partial<ProductItem>): Promise<ProductItem | null> {
  await ensureInit();
  const numId = Number(id);
  const items = readLocalProducts();
  const index = items.findIndex((p) => p.id === numId);

  if (index === -1) return null;

  const existing = items[index];
  const updated: ProductItem = {
    ...existing,
    ...data,
    id: existing.id,
    price: data.price !== undefined ? Number(data.price) : existing.price,
    regular_price: data.regular_price !== undefined ? Number(data.regular_price) : existing.regular_price,
    sale_price: data.sale_price !== undefined ? (data.sale_price ? Number(data.sale_price) : null) : existing.sale_price,
    stock_count: data.stock_count !== undefined ? Number(data.stock_count) : existing.stock_count,
    in_stock: data.in_stock !== undefined ? Boolean(data.in_stock) : existing.in_stock,
    updated_at: new Date().toISOString(),
  };

  updated.stock_text = updated.in_stock ? (updated.stock_count > 0 ? 'In stock' : 'Out of stock') : 'Out of stock';

  items[index] = updated;
  writeLocalProducts(items);

  if (pgConnected && pool) {
    try {
      await pool.query(
        `UPDATE nexsolia_products SET
          name = $1, slug = $2, type = $3, sku = $4, price = $5, regular_price = $6, sale_price = $7,
          on_sale = $8, discount_percent = $9, in_stock = $10, stock_count = $11, stock_text = $12,
          primary_image = $13, hover_image = $14, gallery = $15, categories = $16, brands = $17,
          short_description = $18, description = $19, attributes = $20, updated_at = NOW()
        WHERE id = $21`,
        [
          updated.name,
          updated.slug,
          updated.type,
          updated.sku,
          updated.price,
          updated.regular_price,
          updated.sale_price,
          updated.on_sale,
          updated.discount_percent,
          updated.in_stock,
          updated.stock_count,
          updated.stock_text,
          updated.primary_image,
          updated.hover_image,
          JSON.stringify(updated.gallery),
          JSON.stringify(updated.categories),
          JSON.stringify(updated.brands),
          updated.short_description,
          updated.description,
          JSON.stringify(updated.attributes),
          numId,
        ]
      );
    } catch (e) {
      console.warn('PG update error:', e);
    }
  }

  return updated;
}

export async function deleteProduct(id: number | string): Promise<boolean> {
  await ensureInit();
  const numId = Number(id);
  const items = readLocalProducts();
  const filtered = items.filter((p) => p.id !== numId);

  if (filtered.length === items.length) return false;

  writeLocalProducts(filtered);

  if (pgConnected && pool) {
    try {
      await pool.query('DELETE FROM nexsolia_products WHERE id = $1', [numId]);
    } catch (e) {
      console.warn('PG delete error:', e);
    }
  }

  return true;
}

// ==========================================
// ORDERS MANAGEMENT METHODS
// ==========================================

export async function getOrders(params?: {
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
}): Promise<{ orders: Order[]; total: number; page: number; totalPages: number }> {
  await ensureInit();

  const page = Math.max(1, params?.page || 1);
  const limit = Math.max(1, params?.limit || 20);

  if (pgConnected && pool) {
    try {
      let conditions: string[] = [];
      let values: any[] = [];
      let idx = 1;

      if (params?.search) {
        conditions.push(`(order_number ILIKE $${idx} OR customer_name ILIKE $${idx} OR customer_phone ILIKE $${idx})`);
        values.push(`%${params.search}%`);
        idx++;
      }

      if (params?.status && params.status !== 'all') {
        conditions.push(`status = $${idx}`);
        values.push(params.status);
        idx++;
      }

      const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
      const countRes = await pool.query(`SELECT COUNT(*) FROM nexsolia_orders ${whereClause}`, values);
      const total = parseInt(countRes.rows[0].count, 10);

      const offset = (page - 1) * limit;
      values.push(limit, offset);
      const dataRes = await pool.query(
        `SELECT * FROM nexsolia_orders ${whereClause} ORDER BY created_at DESC LIMIT $${idx} OFFSET $${idx + 1}`,
        values
      );

      return {
        orders: dataRes.rows.map((r: any) => ({
          ...r,
          total_amount: Number(r.total_amount),
          items: typeof r.items === 'string' ? JSON.parse(r.items) : r.items,
        })),
        total,
        page,
        totalPages: Math.ceil(total / limit),
      };
    } catch {
      // Fallback
    }
  }

  let items = readLocalOrders();

  if (params?.search) {
    const s = params.search.toLowerCase();
    items = items.filter(
      (o) =>
        o.order_number.toLowerCase().includes(s) ||
        o.customer_name.toLowerCase().includes(s) ||
        o.customer_phone.toLowerCase().includes(s)
    );
  }

  if (params?.status && params.status !== 'all') {
    items = items.filter((o) => o.status === params.status);
  }

  const total = items.length;
  const offset = (page - 1) * limit;
  const paginated = items.slice(offset, offset + limit);

  return {
    orders: paginated,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
}

export async function getOrderById(id: number | string): Promise<Order | null> {
  await ensureInit();
  const numId = Number(id);

  if (pgConnected && pool) {
    try {
      const res = await pool.query('SELECT * FROM nexsolia_orders WHERE id = $1 LIMIT 1', [numId]);
      if (res.rows.length > 0) {
        const r = res.rows[0];
        return {
          ...r,
          total_amount: Number(r.total_amount),
          items: typeof r.items === 'string' ? JSON.parse(r.items) : r.items,
        };
      }
    } catch {
      // Fallback
    }
  }

  const items = readLocalOrders();
  return items.find((o) => o.id === numId || String(o.id) === String(id)) || null;
}

export async function createOrder(data: Partial<Order>): Promise<Order> {
  await ensureInit();
  const items = readLocalOrders();
  const newId = items.length > 0 ? Math.max(...items.map((o) => o.id)) + 1 : 1;
  const orderNumber = data.order_number || `NEX-${1040 + newId}`;

  const newOrder: Order = {
    id: newId,
    order_number: orderNumber,
    customer_name: data.customer_name || 'Walk-in Client',
    customer_phone: data.customer_phone || '+880 1700-000000',
    customer_email: data.customer_email || '',
    shipping_address: data.shipping_address || 'Dhaka, Bangladesh',
    city: data.city || 'Dhaka',
    status: data.status || 'pending',
    total_amount: Number(data.total_amount) || 0,
    payment_method: data.payment_method || 'Cash on Delivery',
    notes: data.notes || '',
    items: data.items || [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  items.unshift(newOrder);
  writeLocalOrders(items);

  if (pgConnected && pool) {
    try {
      await pool.query(
        `INSERT INTO nexsolia_orders (
          id, order_number, customer_name, customer_phone, customer_email,
          shipping_address, city, status, total_amount, payment_method, notes, items, created_at, updated_at
        ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)`,
        [
          newOrder.id,
          newOrder.order_number,
          newOrder.customer_name,
          newOrder.customer_phone,
          newOrder.customer_email,
          newOrder.shipping_address,
          newOrder.city,
          newOrder.status,
          newOrder.total_amount,
          newOrder.payment_method,
          newOrder.notes,
          JSON.stringify(newOrder.items),
          newOrder.created_at,
          newOrder.updated_at,
        ]
      );
    } catch (e) {
      console.warn('PG order insert error:', e);
    }
  }

  return newOrder;
}

export async function updateOrderStatus(id: number | string, status: Order['status'], notes?: string): Promise<Order | null> {
  await ensureInit();
  const numId = Number(id);
  const items = readLocalOrders();
  const index = items.findIndex((o) => o.id === numId);

  if (index === -1) return null;

  items[index].status = status;
  if (notes !== undefined) {
    items[index].notes = notes;
  }
  items[index].updated_at = new Date().toISOString();

  writeLocalOrders(items);

  if (pgConnected && pool) {
    try {
      await pool.query(
        `UPDATE nexsolia_orders SET status = $1, notes = COALESCE($2, notes), updated_at = NOW() WHERE id = $3`,
        [status, notes, numId]
      );
    } catch (e) {
      console.warn('PG order status update error:', e);
    }
  }

  return items[index];
}

export async function deleteOrder(id: number | string): Promise<boolean> {
  await ensureInit();
  const numId = Number(id);
  const items = readLocalOrders();
  const filtered = items.filter((o) => o.id !== numId);

  if (filtered.length === items.length) return false;

  writeLocalOrders(filtered);

  if (pgConnected && pool) {
    try {
      await pool.query('DELETE FROM nexsolia_orders WHERE id = $1', [numId]);
    } catch (e) {
      console.warn('PG order delete error:', e);
    }
  }

  return true;
}

// ==========================================
// ADMIN DASHBOARD STATS
// ==========================================

export async function getAdminStats() {
  await ensureInit();
  const prods = readLocalProducts();
  const ords = readLocalOrders();

  const totalProducts = prods.length;
  const inStockProducts = prods.filter((p) => p.in_stock).length;
  const outOfStockProducts = totalProducts - inStockProducts;
  const lowStockProducts = prods.filter((p) => p.in_stock && p.stock_count <= 5).length;

  const totalOrders = ords.length;
  const pendingOrders = ords.filter((o) => o.status === 'pending').length;
  const processingOrders = ords.filter((o) => o.status === 'processing').length;
  const completedOrders = ords.filter((o) => o.status === 'completed').length;
  const cancelledOrders = ords.filter((o) => o.status === 'cancelled').length;

  const totalRevenue = ords
    .filter((o) => o.status !== 'cancelled')
    .reduce((sum, o) => sum + (o.total_amount || 0), 0);

  return {
    totalProducts,
    inStockProducts,
    outOfStockProducts,
    lowStockProducts,
    totalOrders,
    pendingOrders,
    processingOrders,
    completedOrders,
    cancelledOrders,
    totalRevenue,
    recentOrders: ords.slice(0, 5),
    lowStockList: prods.filter((p) => p.stock_count <= 5).slice(0, 6),
  };
}
