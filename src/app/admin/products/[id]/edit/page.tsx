import React, { Suspense } from "react";
import { notFound } from "next/navigation";
import { getProductById } from "@/lib/db";
import { getAllCategories, getAllBrands } from "@/lib/catalog";
import ProductForm from "@/components/admin/ProductForm";

interface Props {
  params: Promise<{ id: string }>;
}

async function EditProductContent({ params }: Props) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  const categories = getAllCategories();
  const brands = getAllBrands();

  return (
    <ProductForm
      initialData={product}
      categories={categories}
      brands={brands}
      isEdit={true}
    />
  );
}

export default function EditProductPage({ params }: Props) {
  return (
    <Suspense
      fallback={
        <div className="space-y-6 animate-pulse max-w-6xl mx-auto p-4">
          <div className="h-10 bg-slate-800 rounded-xl w-64" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 h-96 bg-[#0a192f] border border-slate-800 rounded-2xl" />
            <div className="h-96 bg-[#0a192f] border border-slate-800 rounded-2xl" />
          </div>
        </div>
      }
    >
      <EditProductContent params={params} />
    </Suspense>
  );
}
