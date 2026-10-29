"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Upload,
  X,
  Plus,
  Save,
  ArrowLeft,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Eye,
} from "lucide-react";
import type { ProductItem } from "@/lib/db";

interface CategoryOption {
  id: number;
  name: string;
  slug: string;
}

interface BrandOption {
  id: number;
  name: string;
  slug: string;
}

interface Props {
  initialData?: ProductItem;
  categories: CategoryOption[];
  brands: BrandOption[];
  isEdit?: boolean;
}

export default function ProductForm({
  initialData,
  categories,
  brands,
  isEdit = false,
}: Props) {
  const router = useRouter();

  // Form State
  const [name, setName] = useState(initialData?.name || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [sku, setSku] = useState(initialData?.sku || "");
  const [type, setType] = useState(initialData?.type || "simple");
  const [regularPrice, setRegularPrice] = useState(
    initialData?.regular_price !== undefined ? String(initialData.regular_price) : ""
  );
  const [salePrice, setSalePrice] = useState(
    initialData?.sale_price !== null && initialData?.sale_price !== undefined
      ? String(initialData.sale_price)
      : ""
  );
  const [onSale, setOnSale] = useState(initialData?.on_sale || false);
  const [inStock, setInStock] = useState(initialData?.in_stock ?? true);
  const [stockCount, setStockCount] = useState(
    initialData?.stock_count !== undefined ? String(initialData.stock_count) : "15"
  );
  const [primaryImage, setPrimaryImage] = useState(initialData?.primary_image || "");
  const [hoverImage, setHoverImage] = useState(initialData?.hover_image || "");
  const [gallery, setGallery] = useState<string[]>(initialData?.gallery || []);
  const [newGalleryUrl, setNewGalleryUrl] = useState("");
  const [selectedCats, setSelectedCats] = useState<CategoryOption[]>(
    initialData?.categories || []
  );
  const [selectedBrand, setSelectedBrand] = useState<string>(
    initialData?.brands?.[0]?.slug || ""
  );
  const [shortDesc, setShortDesc] = useState(initialData?.short_description || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [descTab, setDescTab] = useState<"edit" | "preview">("edit");

  // Loading & status
  const [uploadingPrimary, setUploadingPrimary] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(
    null
  );

  // Auto-generate slug from name if not manually edited
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setName(val);
    if (!isEdit) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "")
      );
    }
  };

  // Upload file helper
  const uploadFile = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (data.success && data.url) {
      return data.url;
    }
    throw new Error(data.error || "Upload failed");
  };

  const handlePrimaryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingPrimary(true);
    try {
      const url = await uploadFile(file);
      if (url) setPrimaryImage(url);
    } catch (err: any) {
      alert(err.message || "Failed to upload image");
    } finally {
      setUploadingPrimary(false);
    }
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploadingGallery(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const url = await uploadFile(files[i]);
        if (url) setGallery((prev) => [...prev, url]);
      }
    } catch (err: any) {
      alert(err.message || "Failed to upload gallery images");
    } finally {
      setUploadingGallery(false);
    }
  };

  const addGalleryUrl = () => {
    if (!newGalleryUrl.trim()) return;
    setGallery((prev) => [...prev, newGalleryUrl.trim()]);
    setNewGalleryUrl("");
  };

  const removeGalleryImage = (index: number) => {
    setGallery((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleCategory = (cat: CategoryOption) => {
    setSelectedCats((prev) => {
      const exists = prev.some((c) => c.id === cat.id);
      if (exists) {
        return prev.filter((c) => c.id !== cat.id);
      } else {
        return [...prev, cat];
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setFeedback({ type: "error", message: "Product name is required." });
      return;
    }

    setSubmitting(true);
    setFeedback(null);

    const parsedRegular = parseFloat(regularPrice) || 0;
    const parsedSale = salePrice ? parseFloat(salePrice) : null;
    const activePrice = onSale && parsedSale ? parsedSale : parsedRegular;
    const discount =
      onSale && parsedRegular > 0 && parsedSale
        ? Math.round(((parsedRegular - parsedSale) / parsedRegular) * 100)
        : 0;

    const brandObj = brands.find((b) => b.slug === selectedBrand);
    const brandsArray = brandObj ? [brandObj] : [];

    const payload = {
      name: name.trim(),
      slug: slug.trim(),
      sku: sku.trim(),
      type,
      price: activePrice,
      regular_price: parsedRegular,
      sale_price: parsedSale,
      on_sale: onSale,
      discount_percent: discount,
      in_stock: inStock,
      stock_count: parseInt(stockCount, 10) || 0,
      primary_image: primaryImage,
      hover_image: hoverImage || primaryImage,
      gallery,
      categories: selectedCats,
      brands: brandsArray,
      short_description: shortDesc,
      description,
    };

    try {
      const url = isEdit && initialData
        ? `/api/admin/products/${initialData.id}`
        : `/api/admin/products`;

      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setFeedback({
          type: "success",
          message: isEdit ? "Product updated successfully!" : "Product created successfully!",
        });
        setTimeout(() => {
          router.push("/admin/products");
          router.refresh();
        }, 1200);
      } else {
        setFeedback({ type: "error", message: data.error || "Failed to save product" });
      }
    } catch {
      setFeedback({ type: "error", message: "Network error saving product." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-6xl mx-auto pb-16">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              {isEdit ? `Edit: ${initialData?.name}` : "Create New Product"}
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Configure product details, pricing, inventory, categories, and real images.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="px-4 py-2 rounded-xl text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-semibold bg-[#0067E0] hover:bg-[#014898] text-white shadow-lg shadow-[#0067E0]/25 transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{submitting ? "Saving..." : isEdit ? "Save Changes" : "Publish Product"}</span>
          </button>
        </div>
      </div>

      {/* Feedback banner */}
      {feedback && (
        <div
          className={`p-4 rounded-xl flex items-center gap-3 text-sm font-medium ${
            feedback.type === "success"
              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
              : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
          }`}
        >
          {feedback.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 shrink-0" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Form Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Columns: Main Fields */}
        <div className="lg:col-span-2 space-y-6">
          {/* General Information Card */}
          <div className="p-6 rounded-2xl bg-[#0a192f] border border-slate-800 shadow-xl space-y-4">
            <h2 className="text-base font-bold text-white border-b border-slate-800 pb-3">
              General Information
            </h2>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Product Title <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={handleNameChange}
                placeholder="e.g. Orvibo Zigbee 3.0 Smart Gateway Mini"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-[#02A5F2]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  URL Slug
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="product-url-slug"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm font-mono text-slate-300 focus:outline-none focus:border-[#02A5F2]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  SKU (Item Code)
                </label>
                <input
                  type="text"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  placeholder="NEX-GW-01"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm font-mono text-slate-300 focus:outline-none focus:border-[#02A5F2]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Product Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-slate-300 focus:outline-none focus:border-[#02A5F2]"
              >
                <option value="simple">Simple Product</option>
                <option value="variable">Variable Product</option>
              </select>
            </div>
          </div>

          {/* Pricing & Stock Card */}
          <div className="p-6 rounded-2xl bg-[#0a192f] border border-slate-800 shadow-xl space-y-4">
            <h2 className="text-base font-bold text-white border-b border-slate-800 pb-3">
              Pricing & Inventory
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Regular Price (BDT ৳) <span className="text-rose-400">*</span>
                </label>
                <input
                  type="number"
                  step="any"
                  required
                  value={regularPrice}
                  onChange={(e) => setRegularPrice(e.target.value)}
                  placeholder="0.00"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-[#02A5F2]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Sale Price (BDT ৳)
                </label>
                <input
                  type="number"
                  step="any"
                  value={salePrice}
                  onChange={(e) => setSalePrice(e.target.value)}
                  placeholder="Optional discount price"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-[#02A5F2]"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-2">
              <label className="flex items-center gap-2.5 cursor-pointer text-sm font-medium text-slate-200">
                <input
                  type="checkbox"
                  checked={onSale}
                  onChange={(e) => setOnSale(e.target.checked)}
                  className="w-4 h-4 rounded text-[#0067E0] bg-slate-900 border-slate-700"
                />
                <span>Mark as On Sale</span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer text-sm font-medium text-slate-200">
                <input
                  type="checkbox"
                  checked={inStock}
                  onChange={(e) => setInStock(e.target.checked)}
                  className="w-4 h-4 rounded text-[#0067E0] bg-slate-900 border-slate-700"
                />
                <span>In Stock</span>
              </label>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Stock Count:</span>
                <input
                  type="number"
                  value={stockCount}
                  onChange={(e) => setStockCount(e.target.value)}
                  className="w-20 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-sm text-white text-center focus:outline-none focus:border-[#02A5F2]"
                />
              </div>
            </div>
          </div>

          {/* Descriptions Card */}
          <div className="p-6 rounded-2xl bg-[#0a192f] border border-slate-800 shadow-xl space-y-4">
            <h2 className="text-base font-bold text-white border-b border-slate-800 pb-3">
              Descriptions & Specifications
            </h2>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Short Summary Description
              </label>
              <textarea
                rows={2}
                value={shortDesc}
                onChange={(e) => setShortDesc(e.target.value)}
                placeholder="Brief 1-2 sentence highlight shown on shop cards and top of product page..."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-[#02A5F2]"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Full Rich Description (HTML supported)
                </label>
                <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800 text-xs">
                  <button
                    type="button"
                    onClick={() => setDescTab("edit")}
                    className={`px-3 py-1 rounded-md font-medium transition-colors ${
                      descTab === "edit"
                        ? "bg-[#0067E0] text-white"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Editor
                  </button>
                  <button
                    type="button"
                    onClick={() => setDescTab("preview")}
                    className={`px-3 py-1 rounded-md font-medium flex items-center gap-1 transition-colors ${
                      descTab === "preview"
                        ? "bg-[#0067E0] text-white"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <Eye className="w-3 h-3" />
                    <span>Live Preview</span>
                  </button>
                </div>
              </div>

              {descTab === "edit" ? (
                <textarea
                  rows={8}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter full technical details, features, specs, and HTML descriptions..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 font-mono text-xs text-slate-200 focus:outline-none focus:border-[#02A5F2]"
                />
              ) : (
                <div
                  className="w-full min-h-[200px] p-4 rounded-xl bg-slate-900 border border-slate-700 text-sm text-slate-200 prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: description || "<p>No description entered yet.</p>" }}
                />
              )}
            </div>
          </div>
        </div>

        {/* Right 1 Column: Images & Categorization */}
        <div className="space-y-6">
          {/* Primary Image Upload Card */}
          <div className="p-6 rounded-2xl bg-[#0a192f] border border-slate-800 shadow-xl space-y-4">
            <h2 className="text-base font-bold text-white border-b border-slate-800 pb-3">
              Primary Product Image
            </h2>

            {primaryImage ? (
              <div className="relative aspect-square w-full rounded-2xl bg-slate-900 border border-slate-700 overflow-hidden group">
                <Image
                  src={primaryImage}
                  alt="Primary product"
                  fill
                  className="object-contain p-2"
                />
                <button
                  type="button"
                  onClick={() => setPrimaryImage("")}
                  className="absolute top-3 right-3 p-1.5 rounded-full bg-rose-600/90 hover:bg-rose-600 text-white shadow-lg transition-transform hover:scale-110"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="relative border-2 border-dashed border-slate-700 hover:border-[#02A5F2] rounded-2xl p-6 text-center transition-colors">
                <ImageIcon className="w-10 h-10 text-slate-500 mx-auto mb-2" />
                <p className="text-xs font-semibold text-slate-300">
                  Drop image here or click to upload
                </p>
                <p className="text-[11px] text-slate-500 mt-1">
                  JPG, PNG, WebP up to 10MB
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePrimaryUpload}
                  disabled={uploadingPrimary}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                {uploadingPrimary && (
                  <div className="absolute inset-0 bg-slate-900/80 flex items-center justify-center text-xs text-[#02A5F2] font-semibold">
                    Uploading...
                  </div>
                )}
              </div>
            )}

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Or paste image URL
              </label>
              <input
                type="text"
                value={primaryImage}
                onChange={(e) => setPrimaryImage(e.target.value)}
                placeholder="https://... or /uploads/..."
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-[#02A5F2]"
              />
            </div>
          </div>

          {/* Product Gallery Card */}
          <div className="p-6 rounded-2xl bg-[#0a192f] border border-slate-800 shadow-xl space-y-4">
            <h2 className="text-base font-bold text-white border-b border-slate-800 pb-3">
              Gallery Images ({gallery.length})
            </h2>

            <div className="grid grid-cols-3 gap-2">
              {gallery.map((img, idx) => (
                <div
                  key={idx}
                  className="relative aspect-square rounded-xl bg-slate-900 border border-slate-800 overflow-hidden group"
                >
                  <Image src={img} alt={`Gallery ${idx}`} fill className="object-cover" />
                  <button
                    type="button"
                    onClick={() => removeGalleryImage(idx)}
                    className="absolute top-1 right-1 p-1 rounded-full bg-rose-600 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}

              <label className="relative aspect-square border-2 border-dashed border-slate-700 hover:border-[#02A5F2] rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors">
                <Upload className="w-5 h-5 text-slate-400 mb-1" />
                <span className="text-[10px] text-slate-400">Add Pic</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleGalleryUpload}
                  disabled={uploadingGallery}
                  className="hidden"
                />
              </label>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={newGalleryUrl}
                onChange={(e) => setNewGalleryUrl(e.target.value)}
                placeholder="Add gallery image URL..."
                className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-[#02A5F2]"
              />
              <button
                type="button"
                onClick={addGalleryUrl}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-[#0067E0] text-xs font-semibold text-white transition-colors"
              >
                Add
              </button>
            </div>
          </div>

          {/* Classification: Categories & Brand */}
          <div className="p-6 rounded-2xl bg-[#0a192f] border border-slate-800 shadow-xl space-y-4">
            <h2 className="text-base font-bold text-white border-b border-slate-800 pb-3">
              Classification
            </h2>

            {/* Brand Dropdown */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Brand
              </label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-slate-300 focus:outline-none focus:border-[#02A5F2]"
              >
                <option value="">Select Brand</option>
                {brands.map((b) => (
                  <option key={b.id} value={b.slug}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Checkboxes */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Assigned Categories ({selectedCats.length})
              </label>
              <div className="max-h-56 overflow-y-auto space-y-1 p-2 rounded-xl bg-slate-900 border border-slate-800 divide-y divide-slate-800/60">
                {categories.map((cat) => {
                  const isChecked = selectedCats.some((c) => c.id === cat.id);
                  return (
                    <label
                      key={cat.id}
                      className="flex items-center gap-2.5 py-1.5 px-2 hover:bg-slate-800/40 rounded cursor-pointer text-xs text-slate-300"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleCategory(cat)}
                        className="w-3.5 h-3.5 rounded text-[#0067E0] bg-slate-800 border-slate-700"
                      />
                      <span className={isChecked ? "font-semibold text-white" : ""}>
                        {cat.name}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
