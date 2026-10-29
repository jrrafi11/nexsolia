import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  ShoppingCart,
  Store,
  Database,
  ExternalLink,
  Layers,
} from "lucide-react";

export const metadata = {
  title: "Nexsolia Admin | Products & Orders Management",
  description: "Nexsolia Smart Solutions E-Commerce & IoT Administration Portal",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#071324] text-slate-100 flex flex-col md:flex-row antialiased font-sans">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#0a192f] border-r border-slate-800/80 flex flex-col shrink-0">
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0067E0] to-[#02A5F2] flex items-center justify-center text-white font-black shadow-lg shadow-[#0067E0]/30 text-lg">
              N
            </div>
            <div>
              <span className="font-extrabold text-base tracking-wide text-white block">
                NEXSOLIA
              </span>
              <span className="text-[10px] tracking-widest uppercase font-semibold text-[#02A5F2] block">
                ADMIN CONSOLE
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1.5 flex-1">
          <div className="px-3 py-2 text-[11px] font-semibold tracking-wider uppercase text-slate-400">
            Overview
          </div>
          <Link
            href="/admin"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all group"
          >
            <LayoutDashboard className="w-4 h-4 text-[#02A5F2] group-hover:scale-110 transition-transform" />
            <span>Dashboard</span>
          </Link>

          <div className="pt-4 px-3 py-2 text-[11px] font-semibold tracking-wider uppercase text-slate-400">
            Catalog Management
          </div>
          <Link
            href="/admin/products"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all group"
          >
            <Package className="w-4 h-4 text-[#0067E0] group-hover:scale-110 transition-transform" />
            <span>All Products</span>
          </Link>
          <Link
            href="/admin/products/new"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all group"
          >
            <PlusCircle className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
            <span>Add New Product</span>
          </Link>

          <div className="pt-4 px-3 py-2 text-[11px] font-semibold tracking-wider uppercase text-slate-400">
            Sales & Orders
          </div>
          <Link
            href="/admin/orders"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all group"
          >
            <ShoppingCart className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
            <span>Orders & Sales</span>
          </Link>

          <div className="pt-4 px-3 py-2 text-[11px] font-semibold tracking-wider uppercase text-slate-400">
            Storefront
          </div>
          <Link
            href="/shop"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all group"
          >
            <div className="flex items-center gap-3">
              <Store className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
              <span>Public Store</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </Link>
        </nav>

        {/* Database Status Card in Sidebar */}
        <div className="p-4 border-t border-slate-800/80 m-3 rounded-2xl bg-[#0d223f]/60 border border-slate-700/50">
          <div className="flex items-center gap-2 mb-1.5">
            <Database className="w-4 h-4 text-[#02A5F2]" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              PostgreSQL
            </span>
          </div>
          <p className="text-[11px] text-slate-300 mb-2">
            Schema: Products & Orders ready with 431 aura.eg items.
          </p>
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Database Active</span>
          </div>
        </div>
      </aside>

      {/* Main Body */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-16 border-b border-slate-800/80 bg-[#0a192f]/80 backdrop-blur px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <div className="text-sm text-slate-400 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#02A5F2]" />
              <span className="text-white font-medium">Nexsolia Management System</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/products/new"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#0067E0] hover:bg-[#014898] text-white shadow-md shadow-[#0067E0]/20 transition-all"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Create Product</span>
            </Link>
            <Link
              href="/shop"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all"
            >
              <span>View Store</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </header>

        {/* Content */}
        <main className="p-6 md:p-8 flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
