import React, { Suspense } from "react";
import { notFound } from "next/navigation";
import { getProductBySlug, getAllProducts } from "@/lib/catalog";
import productDetailsData from "@/data/aura-product-details.json";
import SingleProductClient from "./SingleProductClient";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = getAllProducts();
  return products.slice(0, 40).map((p) => ({
    slug: p.slug,
  }));
}

function ProductDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 pt-36 pb-12 animate-pulse space-y-12">
      <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-48" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="aspect-square bg-slate-200 dark:bg-slate-800 rounded-3xl" />
        <div className="space-y-6">
          <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
          <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-1/4" />
          <div className="h-24 bg-slate-100 dark:bg-slate-900 rounded-2xl" />
          <div className="h-12 bg-slate-200 dark:bg-slate-800 rounded-xl w-48" />
        </div>
      </div>
    </div>
  );
}

async function ProductContent({ params }: ProductPageProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const product = getProductBySlug(decodedSlug);

  if (!product) {
    notFound();
  }

  const details = (productDetailsData as Record<string, any>)[product.slug] || {
    shortDescription: "",
    description: "",
    gallery: [{ src: product.primaryImage, thumb: product.primaryImage, alt: product.name }],
    attributes: [],
  };

  const allProds = getAllProducts();
  const primaryCat = product.categories[0]?.slug;
  const relatedProducts = allProds
    .filter((p) => p.id !== product.id && p.categories.some((c) => c.slug === primaryCat))
    .slice(0, 4);

  return (
    <SingleProductClient
      product={product}
      details={details}
      relatedProducts={relatedProducts}
    />
  );
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  return (
    <Suspense fallback={<ProductDetailSkeleton />}>
      <ProductContent params={params} />
    </Suspense>
  );
}
