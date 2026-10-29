"use client";

import React, { useState } from "react";
import Link from "next/link";
import type { CatalogProduct } from "@/lib/catalog";

interface SingleProductClientProps {
  product: CatalogProduct;
  details: {
    shortDescription: string;
    description: string;
    gallery: { src: string; thumb: string; alt: string }[];
    attributes: { name: string; terms: string[] }[];
  };
  relatedProducts: CatalogProduct[];
}

function formatNumber(n: number): string {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: n % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  });
}

export default function SingleProductClient({
  product,
  details,
  relatedProducts,
}: SingleProductClientProps) {
  const gallery = details.gallery?.length > 0
    ? details.gallery
    : [{ src: product.primaryImage, thumb: product.primaryImage, alt: product.name }];

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"desc" | "specs" | "shipping">("desc");

  const primaryCategory = product.categories[0];

  const handleWhatsAppQuote = () => {
    const text = encodeURIComponent(
      `Hello Nexsolia, I would like to inquire about: ${product.name} (SKU: ${product.sku}).`
    );
    window.open(`https://wa.me/8801753482155?text=${text}`, "_blank");
  };

  return (
    <div className="wd-page-content main-page-wrapper">
      <main id="main-content" className="wd-content-layout content-layout-wrapper wd-builder-off" role="main">
        <div className="wd-content-area site-content">
          <div className="single-product-page">
            <div className="container">
              <div className="product-image-summary-wrap">
                <div className="product-image-summary">
                  <div
                    className="product-image-summary-inner wd-grid-g"
                    style={{ "--wd-col-lg": 12, "--wd-gap-lg": "30px" } as React.CSSProperties}
                  >
                    {/* Left: Product Gallery */}
                    <div className="product-images wd-grid-col">
                      <div className="single-product-gallery-box">
                        <div className="single-product-main-img">
                          <img
                            src={gallery[activeImageIdx]?.src || product.primaryImage || "/logo-icon.png"}
                            alt={gallery[activeImageIdx]?.alt || product.name}
                            loading="eager"
                          />
                        </div>

                        {gallery.length > 1 && (
                          <div className="single-product-thumbs">
                            {gallery.map((img, i) => (
                              <button
                                key={i}
                                type="button"
                                className={`single-product-thumb-btn ${activeImageIdx === i ? "active" : ""}`}
                                onClick={() => setActiveImageIdx(i)}
                              >
                                <img src={img.thumb || img.src || "/logo-icon.png"} alt={img.alt || product.name} loading="lazy" />
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right: Product Info & Buy */}
                    <div className="summary entry-summary text-left wd-grid-col">
                      <div className="summary-inner">
                        {/* Breadcrumbs */}
                        <div className="single-breadcrumbs-wrapper">
                          <nav className="wd-breadcrumbs woocommerce-breadcrumb" aria-label="Breadcrumb">
                            <Link href="/">Home</Link>
                            <span className="wd-delimiter"></span>
                            <Link href="/shop">Shop</Link>
                            {primaryCategory && (
                              <>
                                <span className="wd-delimiter"></span>
                                <Link href={`/product-category/${primaryCategory.slug}`}>
                                  {primaryCategory.name}
                                </Link>
                              </>
                            )}
                            <span className="wd-delimiter"></span>
                            <span className="wd-last">{product.name}</span>
                          </nav>
                        </div>

                        {product.brands.length > 0 && (
                          <div className="wd-product-brands">
                            <Link href={`/brand/${product.brands[0].slug}`}>
                              {product.brands[0].name}
                            </Link>
                          </div>
                        )}

                        <h1 className="product_title entry-title wd-entities-title">
                          {product.name}
                        </h1>

                        {/* Price */}
                        {product.priceRange ? (
                          <p className="price">
                            <span className="woocommerce-Price-amount amount">
                              <bdi>
                                <span className="woocommerce-Price-currencySymbol">{product.currencySymbol}</span>
                                {formatNumber(product.priceRange.min)}
                              </bdi>
                            </span>{" "}
                            &ndash;{" "}
                            <span className="woocommerce-Price-amount amount">
                              <bdi>
                                <span className="woocommerce-Price-currencySymbol">{product.currencySymbol}</span>
                                {formatNumber(product.priceRange.max)}
                              </bdi>
                            </span>
                          </p>
                        ) : product.onSale && product.regularPrice > product.salePrice && product.salePrice > 0 ? (
                          <p className="price">
                            <del aria-hidden="true">
                              <span className="woocommerce-Price-amount amount">
                                <bdi>
                                  <span className="woocommerce-Price-currencySymbol">{product.currencySymbol}</span>
                                  {formatNumber(product.regularPrice)}
                                </bdi>
                              </span>
                            </del>{" "}
                            <ins aria-hidden="true">
                              <span className="woocommerce-Price-amount amount">
                                <bdi>
                                  <span className="woocommerce-Price-currencySymbol">{product.currencySymbol}</span>
                                  {formatNumber(product.salePrice)}
                                </bdi>
                              </span>
                            </ins>
                          </p>
                        ) : product.price > 0 ? (
                          <p className="price">
                            <span className="woocommerce-Price-amount amount">
                              <bdi>
                                <span className="woocommerce-Price-currencySymbol">{product.currencySymbol}</span>
                                {formatNumber(product.price)}
                              </bdi>
                            </span>
                          </p>
                        ) : (
                          <p className="price" style={{ fontSize: "19px", color: "#0067E0" }}>
                            Price upon request
                          </p>
                        )}

                        {/* Short Description */}
                        {details.shortDescription && (
                          <div
                            className="woocommerce-product-details__short-description"
                            dangerouslySetInnerHTML={{ __html: details.shortDescription }}
                          />
                        )}

                        {/* Warranty Badge */}
                        <div className="woo-warranty-single">
                          <span className="woo-warranty-icon" aria-hidden="true">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                              <path d="M12 2 4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3Zm0 17.93c-3.31-.89-6-4.36-6-8.84V6.3l6-2.25 6 2.25v4.79c0 4.48-2.69 7.95-6 8.84Z" />
                            </svg>
                          </span>
                          <span className="woo-warranty-text">1 Year Official Nexsolia Warranty</span>
                        </div>

                        {/* Stock */}
                        <p className={`stock ${product.inStock ? "in-stock" : "out-of-stock"}`}>
                          {product.stockText}
                        </p>

                        {/* Cart & Quantity */}
                        <form className="cart" onSubmit={(e) => e.preventDefault()}>
                          <div className="quantity">
                            <button
                              type="button"
                              className="minus btn"
                              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                            >
                              -
                            </button>
                            <input
                              type="number"
                              className="input-text qty text"
                              value={quantity}
                              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
                              min="1"
                            />
                            <button
                              type="button"
                              className="plus btn"
                              onClick={() => setQuantity((q) => q + 1)}
                            >
                              +
                            </button>
                          </div>

                          <button
                            type="button"
                            className="single_add_to_cart_button button alt"
                            onClick={handleWhatsAppQuote}
                          >
                            Order / Inquire via WhatsApp
                          </button>
                        </form>

                        <div style={{ marginTop: "12px" }}>
                          <button
                            type="button"
                            onClick={handleWhatsAppQuote}
                            className="my-quote-button"
                            style={{ background: "#25D366" }}
                          >
                            <span className="my-whatsapp-icon">
                              <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                              </svg>
                            </span>
                            <span>Direct WhatsApp Consultation</span>
                          </button>
                        </div>

                        {/* Product Meta */}
                        <div className="product_meta">
                          <span className="sku_wrapper">
                            <span className="meta-label">SKU:</span>
                            <span className="sku">{product.sku}</span>
                          </span>

                          {product.categories.length > 0 && (
                            <span className="posted_in">
                              <span className="meta-label">Categories:</span>
                              {product.categories.map((c, i) => (
                                <React.Fragment key={c.id}>
                                  {i > 0 && ", "}
                                  <Link href={`/product-category/${c.slug}`}>{c.name}</Link>
                                </React.Fragment>
                              ))}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabs Wrapper */}
              <div className="product-tabs-wrapper">
                <div className="container product-tabs-inner">
                  <div className="woocommerce-tabs wc-tabs-wrapper">
                    <ul className="wd-nav wd-nav-tabs tabs wc-tabs" role="tablist">
                      <li className={activeTab === "desc" ? "active" : ""}>
                        <button type="button" onClick={() => setActiveTab("desc")}>
                          Description
                        </button>
                      </li>
                      {details.attributes?.length > 0 && (
                        <li className={activeTab === "specs" ? "active" : ""}>
                          <button type="button" onClick={() => setActiveTab("specs")}>
                            Specifications
                          </button>
                        </li>
                      )}
                      <li className={activeTab === "shipping" ? "active" : ""}>
                        <button type="button" onClick={() => setActiveTab("shipping")}>
                          Warranty & Delivery
                        </button>
                      </li>
                    </ul>

                    {/* Tab Panels */}
                    {activeTab === "desc" && (
                      <div className="woocommerce-Tabs-panel panel entry-content">
                        {details.description ? (
                          <div dangerouslySetInnerHTML={{ __html: details.description }} />
                        ) : (
                          <p>
                            {product.name} is a high-performance smart automation device engineered for seamless integration with modern smart homes, commercial buildings, and IoT networks.
                          </p>
                        )}
                      </div>
                    )}

                    {activeTab === "specs" && (
                      <div className="woocommerce-Tabs-panel panel entry-content">
                        <table style={{ width: "100%", borderCollapse: "collapse", margin: "16px 0" }}>
                          <tbody>
                            {details.attributes.map((attr, idx) => (
                              <tr key={idx} style={{ borderBottom: "1px solid #eee" }}>
                                <th style={{ textAlign: "left", padding: "10px", color: "#0067E0", width: "30%" }}>
                                  {attr.name}
                                </th>
                                <td style={{ padding: "10px", color: "#333" }}>
                                  {attr.terms.join(", ")}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {activeTab === "shipping" && (
                      <div className="woocommerce-Tabs-panel panel entry-content" style={{ lineHeight: 1.8 }}>
                        <h3 style={{ color: "#0067E0" }}>Official Warranty & Nationwide Support</h3>
                        <p>
                          All products supplied by Nexsolia are 100% authentic with genuine manufacturer warranty. Our certified IoT engineering team provides pre-purchase consultations, installation support, and on-site integration across Dhaka and Bangladesh.
                        </p>
                        <ul>
                          <li><strong>Delivery in Dhaka:</strong> 24–48 hours express courier / engineer handover.</li>
                          <li><strong>Nationwide Delivery:</strong> 48–72 hours via trusted couriers (Sundarban, SA Paribahan, Pathao).</li>
                          <li><strong>Replacement Warranty:</strong> 1 Year replacement warranty on verified manufacturing defects.</li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Related Products Grid */}
              {relatedProducts.length > 0 && (
                <div className="related-products-section" style={{ marginTop: "60px" }}>
                  <div className="aura-category-h1-wrap">
                    <h2 style={{ fontSize: "24px", fontWeight: 800, color: "#111" }}>
                      Related Products
                    </h2>
                  </div>
                  <div
                    className="products wd-products wd-grid-g grid-columns-4"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                      gap: "20px",
                    }}
                  >
                    {relatedProducts.map((rel) => (
                      <div key={rel.id} className="wd-product wd-hover-quick">
                        <div className="product-wrapper">
                          <div className="product-element-top">
                            <Link href={`/product/${rel.slug}`} className="product-image-link">
                              <img
                                src={rel.primaryImage || rel.hoverImage || "/logo-icon.png"}
                                alt={rel.name}
                                width={430}
                                height={430}
                                loading="lazy"
                              />
                            </Link>
                          </div>
                          <h3 className="wd-entities-title">
                            <Link href={`/product/${rel.slug}`}>{rel.name}</Link>
                          </h3>
                          <span className="price">
                            {rel.price > 0
                              ? `${rel.currencySymbol} ${formatNumber(rel.price)}`
                              : "Request Quote"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
