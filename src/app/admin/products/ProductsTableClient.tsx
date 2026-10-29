"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Search,
  PlusCircle,
  ExternalLink,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Filter,
  RefreshCw,
} from "lucide-react";
import type { ProductItem } from "@/lib/db";

interface Props {
  initialProducts: ProductItem[];
  total: number;
  currentPage: number;
  totalPages: number;
  categories: { id: number; name: string; slug: string }[];
  brands: { id: number; name: string; slug: string }[];
  currentSearch?: string;
  currentCategory?: string;
  currentBrand?: string;
  currentStock?: string;
}

export default function ProductsTableClient({
  initialProducts,
  total,
  currentPage,
  totalPages,
  categories,
  brands,
  currentSearch = "",
  currentCategory = "",
  currentBrand = "",
  currentStock = "",
}: Props) {
  const router = useRouter();
  const [products, setProducts] = useState<ProductItem[]>(initialProducts);
  const [search, setSearch] = useState(currentSearch);
  const [selectedCat, setSelectedCat] = useState(currentCategory);
  const [selectedBrand, setSelectedBrand] = useState(currentBrand);
  const [selectedStock, setSelectedStock] = useState(currentStock);
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const applyFilters = (newParams?: {
    s?: string;
    c?: string;
    b?: string;
    st?: string;
    p?: number;
  }) => {
    const s = newParams?.s !== undefined ? newParams.s : search;
    const c = newParams?.c !== undefined ? newParams.c : selectedCat;
    const b = newParams?.b !== undefined ? newParams.b : selectedBrand;
    const st = newParams?.st !== undefined ? newParams.st : selectedStock;
    const p = newParams?.p !== undefined ? newParams.p : 1;

    const params = new URLSearchParams();
    if (s) params.set("search", s);
    if (c) params.set("category", c);
    if (b) params.set("brand", b);
    if (st) params.set("stock", st);
    if (p > 1) params.set("page", String(p));

    router.push(`/admin/products?${params.toString()}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters({ p: 1 });
  };

  const toggleStock = async (prod: ProductItem) => {
    const nextStatus = !prod.in_stock;
    setUpdatingId(prod.id);
    try {
      const res = await fetch(`/api/admin/products/${prod.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          in_stock: nextStatus,
          stock_count: nextStatus && prod.stock_count === 0 ? 10 : prod.stock_count,
        }),
      });
      const data = await res.json();
      if (data.success && data.product) {
        setProducts((prev) =>
          prev.map((p) => (p.id === prod.id ? data.product : p))
        );
      }
    } catch (e) {
      console.error("Failed to update stock", e);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
      } else {
        alert(data.error || "Failed to delete product");
      }
    } catch {
      alert("Error deleting product");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-[#0a192f] border border-slate-800 shadow-lg space-y-4">
        <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products by title, SKU, or slug..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#02A5F2] transition-colors"
            />
          </div>

          {/* Category Dropdown */}
          <select
            value={selectedCat}
            onChange={(e) => {
              setSelectedCat(e.target.value);
              applyFilters({ c: e.target.value, p: 1 });
            }}
            className="px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-sm text-slate-200 focus:outline-none focus:border-[#02A5F2]"
          >
            <option value="">All Categories ({categories.length})</option>
            {categories.map((c) => (
              <option key={c.id} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Brand Dropdown */}
          <select
            value={selectedBrand}
            onChange={(e) => {
              setSelectedBrand(e.target.value);
              applyFilters({ b: e.target.value, p: 1 });
            }}
            className="px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-sm text-slate-200 focus:outline-none focus:border-[#02A5F2]"
          >
            <option value="">All Brands ({brands.length})</option>
            {brands.map((b) => (
              <option key={b.id} value={b.slug}>
                {b.name}
              </option>
            ))}
          </select>

          {/* Stock Filter */}
          <select
            value={selectedStock}
            onChange={(e) => {
              setSelectedStock(e.target.value);
              applyFilters({ st: e.target.value, p: 1 });
            }}
            className="px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-sm text-slate-200 focus:outline-none focus:border-[#02A5F2]"
          >
            <option value="">All Stock</option>
            <option value="in_stock">In Stock Only</option>
            <option value="out_of_stock">Out of Stock</option>
          </select>

          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-[#0067E0] hover:bg-[#014898] text-white shrink-0 transition-colors"
          >
            Filter
          </button>
        </form>

        <div className="flex items-center justify-between text-xs text-slate-400 pt-1 border-t border-slate-800/80">
          <div>
            Showing <span className="font-semibold text-white">{products.length}</span> of{" "}
            <span className="font-semibold text-white">{total}</span> products
          </div>
          {(search || selectedCat || selectedBrand || selectedStock) && (
            <button
              onClick={() => {
                setSearch("");
                setSelectedCat("");
                setSelectedBrand("");
                setSelectedStock("");
                router.push("/admin/products");
              }}
              className="text-[#02A5F2] hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Products Table */}
      <div className="rounded-2xl bg-[#0a192f] border border-slate-800 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-900/80 border-b border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              <tr>
                <th className="p-4 w-16">Image</th>
                <th className="p-4">Product Details</th>
                <th className="p-4">Categories & Brand</th>
                <th className="p-4">Price (৳)</th>
                <th className="p-4">Stock Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">
                    No products found matching your query.
                  </td>
                </tr>
              ) : (
                products.map((prod) => {
                  const isUpdating = updatingId === prod.id;
                  const isDeleting = deletingId === prod.id;

                  return (
                    <tr
                      key={prod.id}
                      className="hover:bg-slate-800/30 transition-colors group"
                    >
                      {/* Thumbnail */}
                      <td className="p-4">
                        <div className="w-14 h-14 rounded-xl bg-slate-900 border border-slate-800 relative overflow-hidden shrink-0">
                          {prod.primary_image ? (
                            <Image
                              src={prod.primary_image}
                              alt={prod.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-600">
                              No image
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Product Details */}
                      <td className="p-4 max-w-xs">
                        <div className="font-bold text-white text-sm line-clamp-1 group-hover:text-[#02A5F2] transition-colors">
                          {prod.name}
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5 flex items-center gap-2">
                          <span className="font-mono text-slate-500">
                            {prod.sku || `ID: ${prod.id}`}
                          </span>
                          <span>•</span>
                          <span className="text-slate-500 truncate">{prod.slug}</span>
                        </div>
                      </td>

                      {/* Categories & Brand */}
                      <td className="p-4 max-w-[200px]">
                        <div className="flex flex-wrap gap-1">
                          {prod.categories?.slice(0, 2).map((c, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700/60"
                            >
                              {c.name}
                            </span>
                          ))}
                        </div>
                        {prod.brands && prod.brands.length > 0 && (
                          <div className="text-[11px] text-[#02A5F2] font-semibold mt-1">
                            {prod.brands[0].name}
                          </div>
                        )}
                      </td>

                      {/* Price */}
                      <td className="p-4">
                        <div className="font-bold text-white text-sm">
                          ৳{prod.price.toLocaleString()}
                        </div>
                        {prod.regular_price > prod.price && (
                          <div className="text-xs text-slate-500 line-through">
                            ৳{prod.regular_price.toLocaleString()}
                          </div>
                        )}
                        {prod.on_sale && (
                          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                            SALE
                          </span>
                        )}
                      </td>

                      {/* Stock Status & Quick Toggle */}
                      <td className="p-4">
                        <button
                          onClick={() => toggleStock(prod)}
                          disabled={isUpdating}
                          className="flex items-center gap-2 group/btn text-left"
                          title="Click to toggle stock status"
                        >
                          {prod.in_stock ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 group-hover/btn:bg-emerald-500/20 transition-colors">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>In Stock ({prod.stock_count})</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/30 group-hover/btn:bg-rose-500/20 transition-colors">
                              <XCircle className="w-3.5 h-3.5" />
                              <span>Out of Stock</span>
                            </span>
                          )}
                          {isUpdating && (
                            <RefreshCw className="w-3.5 h-3.5 text-slate-400 animate-spin" />
                          )}
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/product/${prod.slug}`}
                            target="_blank"
                            title="View on store"
                            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                          <Link
                            href={`/admin/products/${prod.id}/edit`}
                            title="Edit Product"
                            className="p-2 rounded-lg bg-blue-600/20 hover:bg-blue-600 text-[#02A5F2] hover:text-white transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(prod.id, prod.name)}
                            disabled={isDeleting}
                            title="Delete Product"
                            className="p-2 rounded-lg bg-rose-600/20 hover:bg-rose-600 text-rose-400 hover:text-white transition-colors disabled:opacity-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-slate-800 flex items-center justify-between text-sm text-slate-400">
            <div>
              Page <span className="text-white font-semibold">{currentPage}</span> of{" "}
              <span className="text-white font-semibold">{totalPages}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => applyFilters({ p: currentPage - 1 })}
                disabled={currentPage <= 1}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => applyFilters({ p: currentPage + 1 })}
                disabled={currentPage >= totalPages}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
