import React, { Suspense } from "react";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { getProducts } from "@/lib/db";
import { getAllCategories, getAllBrands } from "@/lib/catalog";
import ProductsTableClient from "./ProductsTableClient";

interface Props {
  searchParams: Promise<{
    search?: string;
    category?: string;
    brand?: string;
    stock?: string;
    page?: string;
  }>;
}

function ProductsTableSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Search & Filter Bar Skeleton */}
      <div className="p-4 rounded-2xl bg-[#0a192f] border border-slate-800 shadow-lg flex flex-col md:flex-row gap-3">
        <div className="h-10 bg-slate-900 rounded-xl flex-1" />
        <div className="h-10 bg-slate-900 rounded-xl w-36" />
        <div className="h-10 bg-slate-900 rounded-xl w-32" />
        <div className="h-10 bg-slate-900 rounded-xl w-28" />
        <div className="h-10 bg-[#0067E0]/40 rounded-xl w-20" />
      </div>

      {/* Table Skeleton */}
      <div className="rounded-2xl bg-[#0a192f] border border-slate-800 shadow-xl overflow-hidden">
        <div className="h-12 bg-slate-900/80 border-b border-slate-800" />
        <div className="divide-y divide-slate-800/80 p-4 space-y-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center justify-between gap-4 py-2">
              <div className="w-14 h-14 bg-slate-900 rounded-xl shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-slate-800 rounded w-1/3" />
                <div className="h-3 bg-slate-900 rounded w-1/4" />
              </div>
              <div className="h-6 bg-slate-900 rounded w-24" />
              <div className="h-6 bg-slate-900 rounded w-20" />
              <div className="h-6 bg-slate-900 rounded w-28" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

async function ProductsContent({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  const search = resolvedParams.search || "";
  const category = resolvedParams.category || "";
  const brand = resolvedParams.brand || "";
  const stock = resolvedParams.stock || "";
  const page = parseInt(resolvedParams.page || "1", 10);

  const { products, total, totalPages } = await getProducts({
    search: search || undefined,
    category: category || undefined,
    brand: brand || undefined,
    stock: stock || undefined,
    page,
    limit: 25,
  });

  const categories = getAllCategories();
  const brands = getAllBrands();

  return (
    <ProductsTableClient
      initialProducts={products}
      total={total}
      currentPage={page}
      totalPages={totalPages}
      categories={categories}
      brands={brands}
      currentSearch={search}
      currentCategory={category}
      currentBrand={brand}
      currentStock={stock}
    />
  );
}

export default function AdminProductsPage({ searchParams }: Props) {
  return (
    <div className="space-y-6">
      {/* Static Shell Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Products Catalog
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage all 431+ products, live stock counts, pricing, and images.
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-[#0067E0] hover:bg-[#014898] text-white shadow-lg shadow-[#0067E0]/25 transition-all self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Product</span>
        </Link>
      </div>

      {/* Dynamic Content Wrapped in Suspense */}
      <Suspense fallback={<ProductsTableSkeleton />}>
        <ProductsContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
