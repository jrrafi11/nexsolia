"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import type {
  CatalogCategory,
  CatalogBrand,
  CatalogProduct,
  SidebarCategoryTreeItem,
} from "@/lib/catalog";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface AuraShopArchiveProps {
  title: string;
  breadcrumbs: BreadcrumbItem[];
  products: CatalogProduct[];
  subcatCards?: CatalogCategory[];
  subcatsTitle?: string;
  parentSlugForSubcats?: string;
  sidebarDirectCategories?: CatalogCategory[];
  sidebarCategoryTree: SidebarCategoryTreeItem[];
  brands: CatalogBrand[];
  activeCategorySlug?: string;
  activeBrandSlug?: string;
  initialSearch?: string;
}

function formatNumber(n: number): string {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: n % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  });
}

export default function AuraShopArchive({
  title,
  breadcrumbs,
  products,
  subcatCards = [],
  subcatsTitle = "Subcategories",
  parentSlugForSubcats,
  sidebarDirectCategories,
  sidebarCategoryTree,
  brands,
  activeCategorySlug,
  activeBrandSlug,
  initialSearch = "",
}: AuraShopArchiveProps) {
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [searchInput, setSearchInput] = useState(initialSearch);
  const [sortBy, setSortBy] = useState<string>("menu_order");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);
  const [selectedBrand, setSelectedBrand] = useState<string>(activeBrandSlug || "");

  // Compute min and max prices across the current product set
  const priceBounds = useMemo(() => {
    const priced = products.map((p) => p.price).filter((v) => v > 0);
    if (priced.length === 0) return { min: 0, max: 114000 };
    return {
      min: 0,
      max: Math.ceil(Math.max(...priced)),
    };
  }, [products]);

  const [minPriceInput, setMinPriceInput] = useState<string>("0");
  const [maxPriceInput, setMaxPriceInput] = useState<string>(String(priceBounds.max));
  const [appliedPriceRange, setAppliedPriceRange] = useState<{
    min: number;
    max: number;
  } | null>(null);

  // Track expanded categories in the sidebar tree
  const [openCatIds, setOpenCatIds] = useState<Record<number, boolean>>(() => {
    const initial: Record<number, boolean> = {};
    if (activeCategorySlug) {
      for (const item of sidebarCategoryTree) {
        if (
          item.category.slug === activeCategorySlug ||
          item.children.some((ch) => ch.slug === activeCategorySlug)
        ) {
          initial[item.category.id] = true;
        }
      }
    }
    return initial;
  });

  const toggleCatOpen = (id: number) => {
    setOpenCatIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.categories.some((c) => c.name.toLowerCase().includes(q)) ||
          p.brands.some((b) => b.name.toLowerCase().includes(q))
      );
    }

    if (selectedBrand) {
      list = list.filter((p) =>
        p.brands.some((b) => b.slug.toLowerCase() === selectedBrand.toLowerCase())
      );
    }

    if (appliedPriceRange) {
      list = list.filter((p) => {
        if (p.price === 0) return appliedPriceRange.min === 0;
        return p.price >= appliedPriceRange.min && p.price <= appliedPriceRange.max;
      });
    }

    if (sortBy === "price") {
      list.sort((a, b) => (a.price || 999999) - (b.price || 999999));
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === "date") {
      list.sort((a, b) => b.id - a.id);
    } else if (sortBy === "popularity") {
      list.sort((a, b) => (b.inStock ? 1 : 0) - (a.inStock ? 1 : 0));
    }

    return list;
  }, [products, searchQuery, selectedBrand, appliedPriceRange, sortBy]);

  const ITEMS_PER_PAGE = 12;
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedProducts = filteredProducts.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE
  );

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    setCurrentPage(1);
  };

  const handlePriceFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const minV = Math.max(0, Number(minPriceInput) || 0);
    const maxV = Number(maxPriceInput) || priceBounds.max;
    setAppliedPriceRange({ min: minV, max: maxV });
    setCurrentPage(1);
  };

  const getSubcatHref = (sc: CatalogCategory) => {
    if (parentSlugForSubcats) {
      return `/product-category/${parentSlugForSubcats}/${sc.slug}`;
    }
    return `/product-category/${sc.slug}`;
  };

  return (
    <div className="wd-page-content main-page-wrapper">
      <main
        id="main-content"
        className="wd-content-layout content-layout-wrapper container wd-grid-g wd-sidebar-hidden-md-sm wd-sidebar-hidden-sm wd-builder-off"
        role="main"
      >
        {/* ======================== LEFT SIDEBAR ======================== */}
        <aside
          className={`wd-sidebar sidebar-container wd-grid-col sidebar-left ${
            mobileSidebarOpen ? "wd-opened" : ""
          }`}
        >
          <div className="wd-heading">
            <div className="close-side-widget wd-action-btn wd-style-text wd-cross-icon">
              <a
                href="#close-sidebar"
                onClick={(e) => {
                  e.preventDefault();
                  setMobileSidebarOpen(false);
                }}
              >
                ✕ Close
              </a>
            </div>
          </div>

          <div className="widget-area">
            {/* Search Widget */}
            <div
              id="block-21"
              className="wd-widget widget sidebar-widget widget_block widget_search"
            >
              <form
                role="search"
                onSubmit={handleSearchSubmit}
                className="wp-block-search__button-outside wp-block-search__text-button wp-block-search"
              >
                <label
                  className="wp-block-search__label screen-reader-text"
                  htmlFor="wp-block-search__input-1"
                >
                  Search
                </label>
                <div className="wp-block-search__inside-wrapper">
                  <input
                    className="wp-block-search__input"
                    id="wp-block-search__input-1"
                    placeholder="Search for products…"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    type="search"
                    name="s"
                  />
                  <button
                    aria-label="Search"
                    className="wp-block-search__button wp-element-button"
                    type="submit"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>

            {/* Price Filter Widget */}
            <div
              id="woocommerce_price_filter-6"
              className="wd-widget widget sidebar-widget woocommerce widget_price_filter"
            >
              <form onSubmit={handlePriceFilterSubmit}>
                <div className="price_slider_wrapper">
                  <div className="price-filter-title">Filter by Price</div>
                  <div className="price-inputs-row">
                    <div>
                      <label className="screen-reader-text" htmlFor="min_price">
                        Min price
                      </label>
                      <input
                        type="number"
                        id="min_price"
                        name="min_price"
                        value={minPriceInput}
                        onChange={(e) => setMinPriceInput(e.target.value)}
                        placeholder="Min price"
                      />
                    </div>
                    <div>
                      <label className="screen-reader-text" htmlFor="max_price">
                        Max price
                      </label>
                      <input
                        type="number"
                        id="max_price"
                        name="max_price"
                        value={maxPriceInput}
                        onChange={(e) => setMaxPriceInput(e.target.value)}
                        placeholder="Max price"
                      />
                    </div>
                  </div>
                  <div className="price_slider_amount" data-step="10">
                    <button type="submit" className="button">
                      Filter
                    </button>
                    <div className="price_label">
                      Price: <span className="from">{minPriceInput || 0}</span> &mdash;{" "}
                      <span className="to">{maxPriceInput || priceBounds.max}</span>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            {/* Categories & Brands Box */}
            <div id="block-19" className="wd-widget widget sidebar-widget widget_block">
              <div className="aura-sidecats aura-side-box">
                <div className="aura-sidecats-title">Categories</div>
                {sidebarDirectCategories && sidebarDirectCategories.length > 0 ? (
                  <ul className="aura-sidecats-list">
                    {sidebarDirectCategories.map((cat) => (
                      <li
                        key={cat.id}
                        className={`aura-cat-item ${
                          activeCategorySlug === cat.slug ? "current" : ""
                        }`}
                      >
                        <Link
                          className="aura-cat-link"
                          href={getSubcatHref(cat)}
                          onClick={() => setMobileSidebarOpen(false)}
                        >
                          {cat.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul className="aura-sidecats-list">
                    {sidebarCategoryTree.map(({ category, children }) => {
                      const hasChildren = children.length > 0;
                      const isOpen = Boolean(openCatIds[category.id]);
                      const isCurrent = activeCategorySlug === category.slug;
                      return (
                        <li
                          key={category.id}
                          className={`aura-cat-item ${
                            hasChildren ? "has-children-yes" : "has-children-no"
                          } ${isOpen ? "open" : ""} ${isCurrent ? "current" : ""}`}
                        >
                          <div className="aura-cat-row">
                            <Link
                              className="aura-cat-link"
                              href={`/product-category/${category.slug}`}
                              onClick={() => setMobileSidebarOpen(false)}
                            >
                              {category.name}
                            </Link>
                            {hasChildren && (
                              <button
                                className="aura-cat-toggle"
                                type="button"
                                aria-label="Open subcategories"
                                onClick={() => toggleCatOpen(category.id)}
                              >
                                {isOpen ? "−" : "+"}
                              </button>
                            )}
                          </div>
                          {hasChildren && (
                            <ul className="aura-subcats">
                              {children.map((ch) => (
                                <li key={ch.id}>
                                  <Link
                                    href={`/product-category/${category.slug}/${ch.slug}`}
                                    className={
                                      activeCategorySlug === ch.slug ? "active" : ""
                                    }
                                    onClick={() => setMobileSidebarOpen(false)}
                                  >
                                    {ch.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>

              {/* Brands Box */}
              <div className="aura-sidebrands aura-side-box">
                <div className="aura-sidecats-title">Brands</div>
                <ul className="aura-sidebrands-list">
                  {selectedBrand && (
                    <li className="aura-brand-item">
                      <a
                        href="#all-brands"
                        className="aura-brand-link active"
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedBrand("");
                          setCurrentPage(1);
                        }}
                      >
                        ✕ Clear brand filter ({selectedBrand})
                      </a>
                    </li>
                  )}
                  {brands.map((brand) => (
                    <li key={brand.slug} className="aura-brand-item">
                      <Link
                        className={`aura-brand-link ${
                          selectedBrand === brand.slug ? "active" : ""
                        }`}
                        href={`/brand/${brand.slug}`}
                        onClick={(e) => {
                          // If already inside a category, filter inline or allow navigation
                          if (activeCategorySlug) {
                            e.preventDefault();
                            setSelectedBrand(
                              selectedBrand === brand.slug ? "" : brand.slug
                            );
                            setCurrentPage(1);
                            setMobileSidebarOpen(false);
                          }
                        }}
                      >
                        {brand.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </aside>

        {/* ======================== RIGHT CONTENT AREA ======================== */}
        <div className="wd-content-area site-content wd-grid-col">
          <div className="woocommerce-notices-wrapper"></div>

          <div className="shop-loop-head">
            <div className="wd-shop-tools">
              <nav
                className="wd-breadcrumbs woocommerce-breadcrumb"
                aria-label="Breadcrumb"
              >
                <Link href="/" className="wd-last-link">
                  Home
                </Link>
                {breadcrumbs.map((bc, idx) => (
                  <React.Fragment key={idx}>
                    <span className="wd-delimiter"></span>
                    {bc.href ? (
                      <Link href={bc.href} className="wd-last-link">
                        {bc.label}
                      </Link>
                    ) : (
                      <span className="wd-last">{bc.label}</span>
                    )}
                  </React.Fragment>
                ))}
              </nav>
            </div>

            <div className="wd-shop-tools">
              <div className="aura-category-h1-wrap" dir="ltr">
                <h1 className="aura-category-h1">{title}</h1>
              </div>

              {subcatCards.length > 0 && (
                <div className="aura-top-subcats-wrap">
                  <div className="aura-top-subcats-title">{subcatsTitle}</div>
                  <div className="aura-top-subcats-grid">
                    {subcatCards.map((sc) => (
                      <Link
                        key={sc.id}
                        className="aura-top-subcat-card"
                        href={getSubcatHref(sc)}
                      >
                        <span className="aura-top-subcat-thumb">
                          <img
                            src={sc.image || "/logo-icon.png"}
                            alt={sc.name}
                            width={430}
                            height={430}
                            loading="lazy"
                          />
                        </span>
                        <span className="aura-top-subcat-name">{sc.name}</span>
                        <span className="aura-top-subcat-count">
                          {sc.count} {sc.count === 1 ? "Product" : "Products"}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="wd-shop-toolbar-bottom">
                <div className="wd-show-sidebar-btn wd-action-btn wd-style-text wd-burger-icon">
                  <button
                    type="button"
                    onClick={() => setMobileSidebarOpen(true)}
                  >
                    ☰ Show sidebar
                  </button>
                </div>

                <form
                  className="woocommerce-ordering wd-style-underline wd-ordering-mb-icon"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <select
                    name="orderby"
                    className="orderby"
                    aria-label="Shop order"
                    value={sortBy}
                    onChange={(e) => {
                      setSortBy(e.target.value);
                      setCurrentPage(1);
                    }}
                  >
                    <option value="menu_order">Default sorting</option>
                    <option value="popularity">Sort by popularity</option>
                    <option value="date">Sort by latest</option>
                    <option value="price">Sort by price: low to high</option>
                    <option value="price-desc">Sort by price: high to low</option>
                  </select>
                </form>
              </div>
            </div>
          </div>

          {/* ======================== PRODUCTS GRID ======================== */}
          <div className="wd-products-element">
            <div
              className="products wd-products wd-grid-g grid-columns-3 elements-grid pagination-pagination"
              data-columns="3"
            >
              {paginatedProducts.map((product, idx) => {
                const hasLabels =
                  (product.onSale && product.discountPercent > 0) || !product.inStock;
                const btnLabel = !product.inStock
                  ? "Read more"
                  : product.type === "grouped"
                  ? "View products"
                  : product.type === "variable"
                  ? "Select options"
                  : product.price > 0
                  ? "Add to cart"
                  : "Read more";

                return (
                  <div
                    key={product.id}
                    className={`wd-product ${
                      hasLabels ? "wd-with-labels" : ""
                    } wd-hover-quick wd-col product-grid-item product type-product status-publish ${
                      product.inStock ? "instock" : "outofstock"
                    } ${product.onSale ? "sale" : ""}`}
                    data-loop={idx + 1}
                    data-id={product.id}
                  >
                    <div className="product-wrapper">
                      <div className="product-element-top wd-quick-shop">
                        <Link
                          href={`/product/${product.slug}`}
                          className="product-image-link"
                          aria-label={product.name}
                        >
                          {hasLabels && (
                            <div className="product-labels labels-rounded">
                              {product.onSale && product.discountPercent > 0 && (
                                <span className="onsale product-label">
                                  -{product.discountPercent}%
                                </span>
                              )}
                              {!product.inStock && (
                                <span className="out-of-stock product-label">
                                  Sold out
                                </span>
                              )}
                            </div>
                          )}
                          <img
                            width={430}
                            height={430}
                            src={product.primaryImage || "/logo-icon.png"}
                            className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail"
                            alt={product.name}
                            loading="lazy"
                          />
                        </Link>

                        {product.hoverImage && (
                          <div className="hover-img">
                            <img
                              width={430}
                              height={430}
                              src={product.hoverImage || product.primaryImage || "/logo-icon.png"}
                              className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail"
                              alt={product.name}
                              loading="lazy"
                            />
                          </div>
                        )}

                        <div className="wd-buttons wd-pos-r-t">
                          <div className="wd-compare-btn product-compare-button wd-action-btn wd-style-icon wd-compare-icon">
                            <Link
                              href={`/product/${product.slug}`}
                              aria-label="Compare product"
                              title="Compare"
                            >
                              <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M16 3h5v5" />
                                <path d="M8 3H3v5" />
                                <path d="M12 22v-8.3a4 4 0 0 0-1.172-2.872L3 3" />
                                <path d="m15 9 6-6" />
                              </svg>
                            </Link>
                          </div>
                          <div className="quick-view wd-action-btn wd-style-icon wd-quick-view-icon">
                            <Link
                              href={`/product/${product.slug}`}
                              className="open-quick-view quick-view-button"
                              aria-label="Quick view"
                              title="Quick view"
                            >
                              <svg viewBox="0 0 24 24" aria-hidden="true">
                                <circle cx="11" cy="11" r="8" />
                                <path d="m21 21-4.3-4.3" />
                              </svg>
                            </Link>
                          </div>
                          <div className="wd-wishlist-btn wd-action-btn wd-style-icon wd-wishlist-icon">
                            <Link
                              href={`/product/${product.slug}`}
                              aria-label="Add to wishlist"
                              title="Add to wishlist"
                            >
                              <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
                              </svg>
                            </Link>
                          </div>
                        </div>

                        <div className="wd-add-btn wd-add-btn-replace">
                          <Link
                            href={`/product/${product.slug}`}
                            className="button add-to-cart-loop"
                          >
                            <span>{btnLabel}</span>
                          </Link>
                        </div>
                      </div>

                      <h3 className="wd-entities-title">
                        <Link href={`/product/${product.slug}`}>{product.name}</Link>
                      </h3>

                      {product.categories.length > 0 && (
                        <div className="wd-product-cats">
                          {product.categories.map((c, cIdx) => (
                            <React.Fragment key={c.id}>
                              {cIdx > 0 && ", "}
                              <Link
                                href={`/product-category/${c.slug}`}
                                rel="tag"
                              >
                                {c.name}
                              </Link>
                            </React.Fragment>
                          ))}
                        </div>
                      )}

                      {product.priceRange ? (
                        <span className="price">
                          <span className="woocommerce-Price-amount amount">
                            <bdi>
                              <span className="woocommerce-Price-currencySymbol">
                                {product.currencySymbol}
                              </span>
                              {formatNumber(product.priceRange.min)}
                            </bdi>
                          </span>{" "}
                          &ndash;{" "}
                          <span className="woocommerce-Price-amount amount">
                            <bdi>
                              <span className="woocommerce-Price-currencySymbol">
                                {product.currencySymbol}
                              </span>
                              {formatNumber(product.priceRange.max)}
                            </bdi>
                          </span>
                        </span>
                      ) : product.onSale &&
                        product.regularPrice > product.salePrice &&
                        product.salePrice > 0 ? (
                        <span className="price">
                          <del aria-hidden="true">
                            <span className="woocommerce-Price-amount amount">
                              <bdi>
                                <span className="woocommerce-Price-currencySymbol">
                                  {product.currencySymbol}
                                </span>
                                {formatNumber(product.regularPrice)}
                              </bdi>
                            </span>
                          </del>{" "}
                          <ins aria-hidden="true">
                            <span className="woocommerce-Price-amount amount">
                              <bdi>
                                <span className="woocommerce-Price-currencySymbol">
                                  {product.currencySymbol}
                                </span>
                                {formatNumber(product.salePrice)}
                              </bdi>
                            </span>
                          </ins>
                        </span>
                      ) : product.price > 0 ? (
                        <span className="price">
                          <span className="woocommerce-Price-amount amount">
                            <bdi>
                              <span className="woocommerce-Price-currencySymbol">
                                {product.currencySymbol}
                              </span>
                              {formatNumber(product.price)}
                            </bdi>
                          </span>
                        </span>
                      ) : (
                        <Link
                          href={`/product/${product.slug}`}
                          className="my-quote-button my-quote-loop"
                        >
                          <span>Request a Quote</span>
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ======================== PAGINATION ======================== */}
            {totalPages > 1 && (
              <div className="wd-loop-footer products-footer">
                <nav
                  className="woocommerce-pagination wd-pagination"
                  aria-label="Product Pagination"
                >
                  <ul className="page-numbers">
                    {safePage > 1 && (
                      <li>
                        <button
                          type="button"
                          className="prev page-numbers"
                          onClick={() => {
                            setCurrentPage(safePage - 1);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                        >
                          &larr;
                        </button>
                      </li>
                    )}
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter(
                        (p) =>
                          p === 1 ||
                          p === totalPages ||
                          Math.abs(p - safePage) <= 2
                      )
                      .reduce<number[]>((acc, p) => {
                        if (acc.length > 0 && p - acc[acc.length - 1] > 1) {
                          acc.push(-1);
                        }
                        acc.push(p);
                        return acc;
                      }, [])
                      .map((p, idx) =>
                        p === -1 ? (
                          <li key={`dots-${idx}`}>
                            <span className="page-numbers dots">&hellip;</span>
                          </li>
                        ) : (
                          <li key={p}>
                            {p === safePage ? (
                              <span
                                aria-current="page"
                                className="page-numbers current"
                              >
                                {p}
                              </span>
                            ) : (
                              <button
                                type="button"
                                className="page-numbers"
                                onClick={() => {
                                  setCurrentPage(p);
                                  window.scrollTo({ top: 0, behavior: "smooth" });
                                }}
                              >
                                {p}
                              </button>
                            )}
                          </li>
                        )
                      )}
                    {safePage < totalPages && (
                      <li>
                        <button
                          type="button"
                          className="next page-numbers"
                          onClick={() => {
                            setCurrentPage(safePage + 1);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                        >
                          &rarr;
                        </button>
                      </li>
                    )}
                  </ul>
                </nav>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
