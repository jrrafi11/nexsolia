import React from "react";
import AuraShopArchive from "@/components/shop/AuraShopArchive";
import {
  getAllProducts,
  getAllBrands,
  getMainShopSubcatCards,
  getShopSidebarCategoryTree,
} from "@/lib/catalog";

interface ShopPageProps {
  searchParams: Promise<{ s?: string; filter_brand?: string; brand?: string }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const sp = await searchParams;
  const products = getAllProducts();
  const brands = getAllBrands();
  const mainCards = getMainShopSubcatCards();
  const sidebarTree = getShopSidebarCategoryTree();

  return (
    <AuraShopArchive
      title="Shop"
      breadcrumbs={[{ label: "Shop" }]}
      products={products}
      subcatCards={mainCards}
      subcatsTitle="Main Categories"
      sidebarCategoryTree={sidebarTree}
      brands={brands}
      activeBrandSlug={sp.filter_brand || sp.brand || ""}
      initialSearch={sp.s || ""}
    />
  );
}
