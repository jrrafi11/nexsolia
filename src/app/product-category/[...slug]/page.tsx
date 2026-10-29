import React, { Suspense } from "react";
import AuraShopArchive from "@/components/shop/AuraShopArchive";
import {
  resolveCategoryBySlug,
  getProductsForCategory,
  getSubcategoriesForCategory,
  getShopSidebarCategoryTree,
  getBrandsForProducts,
  getAllProducts,
  getAllCategories,
} from "@/lib/catalog";

interface CategoryPageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateStaticParams() {
  const cats = getAllCategories();
  return cats.slice(0, 40).map((c) => ({
    slug: [c.slug],
  }));
}

function CategoryArchiveSkeleton() {
  return (
    <div className="container mx-auto px-4 pt-36 pb-8 animate-pulse space-y-8">
      {/* Breadcrumbs & Title Skeleton */}
      <div className="space-y-3">
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-48" />
        <div className="h-9 bg-slate-200 dark:bg-slate-800 rounded w-72" />
      </div>

      {/* Top Subcategories Pills Skeleton */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-10 w-36 bg-slate-200 dark:bg-slate-800 rounded-full shrink-0" />
        ))}
      </div>

      {/* Main Grid: Sidebar & Products */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Skeleton */}
        <div className="hidden lg:block space-y-6">
          <div className="h-64 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4" />
          <div className="h-48 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4" />
        </div>

        {/* Product Cards Grid Skeleton */}
        <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="space-y-3 border border-slate-200 dark:border-slate-800 rounded-2xl p-3 bg-white dark:bg-slate-900">
              <div className="aspect-square bg-slate-200 dark:bg-slate-800 rounded-xl" />
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
              <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/2" />
              <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

async function CategoryContent({ params }: CategoryPageProps) {
  const { slug } = await params;
  const targetSlug = slug[slug.length - 1] || "lighting-power-automation";
  const category = resolveCategoryBySlug(targetSlug);

  const allCats = getAllCategories();
  const sidebarTree = getShopSidebarCategoryTree();

  if (!category) {
    const fallbackProducts = getAllProducts();
    const fallbackBrands = getBrandsForProducts(fallbackProducts);
    const titleFormatted = decodeURIComponent(targetSlug)
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

    return (
      <AuraShopArchive
        title={titleFormatted}
        breadcrumbs={[{ label: titleFormatted }]}
        products={fallbackProducts}
        sidebarCategoryTree={sidebarTree}
        brands={fallbackBrands}
        activeCategorySlug={targetSlug}
      />
    );
  }

  // Build breadcrumbs
  const breadcrumbs: { label: string; href?: string }[] = [];
  if (slug.length > 1) {
    let pathAcc = "/product-category";
    for (let i = 0; i < slug.length - 1; i++) {
      pathAcc += `/${slug[i]}`;
      const parentCat = resolveCategoryBySlug(slug[i]);
      breadcrumbs.push({
        label: parentCat ? parentCat.name : slug[i],
        href: pathAcc,
      });
    }
  } else if (category.parent > 0) {
    const parentCat = allCats.find((c) => c.id === category.parent);
    if (parentCat) {
      breadcrumbs.push({
        label: parentCat.name,
        href: `/product-category/${parentCat.slug}`,
      });
    }
  }
  breadcrumbs.push({ label: category.name });

  const products = getProductsForCategory(targetSlug);
  const allSubcats = getSubcategoriesForCategory(category);

  const topSubcatCards = allSubcats.filter(
    (sc) => sc.slug !== "climate-control" && sc.slug !== "smart-home"
  );

  let sidebarDirectCategories = allSubcats;
  let parentSlugForSubcats = category.slug;
  if (sidebarDirectCategories.length === 0 && category.parent > 0) {
    const parentCat = allCats.find((c) => c.id === category.parent);
    if (parentCat) {
      sidebarDirectCategories = getSubcategoriesForCategory(parentCat);
      parentSlugForSubcats = parentCat.slug;
    }
  }

  const brands = getBrandsForProducts(products);

  return (
    <AuraShopArchive
      title={category.name}
      breadcrumbs={breadcrumbs}
      products={products.length > 0 ? products : getAllProducts().slice(0, 12)}
      subcatCards={topSubcatCards}
      subcatsTitle="Subcategories"
      parentSlugForSubcats={parentSlugForSubcats}
      sidebarDirectCategories={
        sidebarDirectCategories.length > 0 ? sidebarDirectCategories : undefined
      }
      sidebarCategoryTree={sidebarTree}
      brands={brands}
      activeCategorySlug={category.slug}
    />
  );
}

export default function ProductCategoryPage({ params }: CategoryPageProps) {
  return (
    <Suspense fallback={<CategoryArchiveSkeleton />}>
      <CategoryContent params={params} />
    </Suspense>
  );
}
