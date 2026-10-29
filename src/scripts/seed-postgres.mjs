import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..', '..');

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/nexsolia_db';
console.log(`Connecting to PostgreSQL at: ${connectionString.replace(/:(.*?)@/, ':***@')}...`);

const pool = new Pool({
  connectionString,
  connectionTimeoutMillis: 5000,
});

async function main() {
  try {
    const client = await pool.connect();
    console.log('✅ Connected to PostgreSQL successfully!');

    console.log('Creating schema tables if not exist...');
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

    // Load data
    const litePath = path.join(rootDir, 'src', 'data', 'aura-catalog-lite.json');
    const detailPath = path.join(rootDir, 'src', 'data', 'aura-product-details.json');

    const lite = JSON.parse(fs.readFileSync(litePath, 'utf-8'));
    const details = JSON.parse(fs.readFileSync(detailPath, 'utf-8'));
    const products = lite.products || [];

    console.log(`Seeding ${products.length} products into nexsolia_products...`);
    let count = 0;
    for (const item of products) {
      const detail = details[item.id] || {};
      const stockQty = Math.floor(Math.abs(Math.sin(item.id)) * 40) + 3;
      const inStock = item.in_stock !== false && stockQty > 0;
      const gallery = detail.gallery && detail.gallery.length > 0 ? detail.gallery : [item.primary_image].filter(Boolean);

      await client.query(
        `INSERT INTO nexsolia_products (
          id, original_id, name, slug, type, sku, price, regular_price, sale_price,
          currency_symbol, on_sale, discount_percent, in_stock, stock_count, stock_text,
          primary_image, hover_image, gallery, categories, brands,
          short_description, description, attributes
        ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23)
        ON CONFLICT (slug) DO UPDATE SET
          name = EXCLUDED.name,
          price = EXCLUDED.price,
          regular_price = EXCLUDED.regular_price,
          sale_price = EXCLUDED.sale_price,
          primary_image = EXCLUDED.primary_image,
          gallery = EXCLUDED.gallery,
          description = EXCLUDED.description,
          updated_at = NOW()`,
        [
          item.id,
          item.id,
          item.name,
          item.slug,
          item.type || 'simple',
          item.sku || `NEX-AURA-${item.id}`,
          item.price || 0,
          item.regular_price || item.price || 0,
          item.sale_price || null,
          '৳',
          !!item.on_sale,
          item.discount_percent || 0,
          inStock,
          stockQty,
          inStock ? 'In stock' : 'Out of stock',
          item.primary_image || '',
          item.hover_image || item.primary_image || '',
          JSON.stringify(gallery),
          JSON.stringify(item.categories || []),
          JSON.stringify(item.brands || []),
          detail.short_description || '',
          detail.description || '',
          JSON.stringify(detail.attributes || []),
        ]
      );
      count++;
    }

    console.log(`✅ Seeded ${count} products successfully!`);
    client.release();
    await pool.end();
  } catch (err) {
    console.error('❌ PostgreSQL Seeding Error:', err.message);
    process.exit(1);
  }
}

main();
