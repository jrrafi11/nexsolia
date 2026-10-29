import React, { Suspense } from "react";
import AuraShopArchive from "@/components/shop/AuraShopArchive";
import {
  getAllProducts,
  getAllBrands,
  getShopSidebarCategoryTree,
} from "@/lib/catalog";

interface BrandPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const brands = getAllBrands();
  return brands.map((b) => ({
    slug: b.slug,
  }));
}

function BrandArchiveSkeleton() {
  return (
    <div className="container mx-auto px-4 pt-36 pb-8 animate-pulse space-y-8">
      <div className="space-y-3">
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-48" />
        <div className="h-9 bg-slate-200 dark:bg-slate-800 rounded w-64" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="hidden lg:block space-y-6">
          <div className="h-64 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4" />
        </div>
        <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="space-y-3 border border-slate-200 dark:border-slate-800 rounded-2xl p-3 bg-white dark:bg-slate-900">
              <div className="aspect-square bg-slate-200 dark:bg-slate-800 rounded-xl" />
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
              <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

async function BrandContent({ params }: BrandPageProps) {
  const { slug } = await params;
  const decoded = decodeURIComponent(slug).toLowerCase();
  const allBrands = getAllBrands();
  const allProducts = getAllProducts();
  const sidebarTree = getShopSidebarCategoryTree();

  const matchedBrand = allBrands.find(
    (b) =>
      b.slug.toLowerCase() === decoded ||
      b.slug.toLowerCase().replace(/-en$/, "") === decoded.replace(/-en$/, "")
  );

  const brandProducts = allProducts.filter((p) =>
    p.brands.some(
      (b) =>
        b.slug.toLowerCase() === decoded ||
        b.slug.toLowerCase().replace(/-en$/, "") === decoded.replace(/-en$/, "")
    )
  );

  const brandTitle = matchedBrand
    ? matchedBrand.name
    : decoded.replace(/-/g, " ").toUpperCase();

  return (
    <AuraShopArchive
      title={brandTitle}
      breadcrumbs={[{ label: "Shop", href: "/shop" }, { label: brandTitle }]}
      products={brandProducts.length > 0 ? brandProducts : allProducts}
      sidebarCategoryTree={sidebarTree}
      brands={allBrands}
      activeBrandSlug={matchedBrand ? matchedBrand.slug : decoded}
    />
  );
}

export default function BrandPage({ params }: BrandPageProps) {
  return (
    <Suspense fallback={<BrandArchiveSkeleton />}>
      <BrandContent params={params} />
    </Suspense>
  );
}
