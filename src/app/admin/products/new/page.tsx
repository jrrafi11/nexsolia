import React from "react";
import { getAllCategories, getAllBrands } from "@/lib/catalog";
import ProductForm from "@/components/admin/ProductForm";

export default function NewProductPage() {
  const categories = getAllCategories();
  const brands = getAllBrands();

  return (
    <ProductForm
      categories={categories}
      brands={brands}
      isEdit={false}
    />
  );
}
