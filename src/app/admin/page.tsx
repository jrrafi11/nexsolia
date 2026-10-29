import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Package,
  ShoppingCart,
  DollarSign,
  AlertTriangle,
  ArrowRight,
  PlusCircle,
  Database,
  CheckCircle2,
  Clock,
  Check,
  TrendingUp,
} from "lucide-react";
import { getAdminStats, getDbStatus } from "@/lib/db";

export default async function AdminDashboardPage() {
  const stats = await getAdminStats();
  const dbStatus = await getDbStatus();

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Page Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Real-time catalog metrics, inventory alerts, and sales performance.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-[#0067E0] hover:bg-[#014898] text-white shadow-lg shadow-[#0067E0]/25 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Product</span>
          </Link>
          <Link
            href="/admin/orders"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700/80 transition-all"
          >
            <ShoppingCart className="w-4 h-4 text-amber-400" />
            <span>Manage Orders</span>
          </Link>
        </div>
      </div>

      {/* Database Engine Banner */}
      <div className="p-4 md:p-5 rounded-2xl bg-gradient-to-r from-[#0d223f] to-[#0a192f] border border-blue-900/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-[#0067E0]/20 border border-[#0067E0]/40 flex items-center justify-center shrink-0">
            <Database className="w-5 h-5 text-[#02A5F2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-base">
                Database Engine: {dbStatus.connected ? "PostgreSQL (Live Online)" : "Synchronized Local & Postgres Ready"}
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                  dbStatus.connected
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                }`}
              >
                {dbStatus.engine}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Integrated with PostgreSQL schema (`nexsolia_products` & `nexsolia_orders`). Run `npm run db:seed` anytime to sync directly with your PostgreSQL instance.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 text-xs text-slate-300 bg-slate-900/60 px-3.5 py-2 rounded-xl border border-slate-800">
          <div>
            <span className="text-slate-500 block text-[10px]">PRODUCTS</span>
            <span className="font-bold text-white text-sm">{stats.totalProducts}</span>
          </div>
          <div className="w-px h-6 bg-slate-800" />
          <div>
            <span className="text-slate-500 block text-[10px]">ORDERS</span>
            <span className="font-bold text-white text-sm">{stats.totalOrders}</span>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Revenue */}
        <div className="p-5 rounded-2xl bg-[#0a192f] border border-slate-800/80 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Total Revenue
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white">
            ৳{stats.totalRevenue.toLocaleString()}
          </div>
          <div className="mt-2 text-xs text-slate-400 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span>From completed & active orders</span>
          </div>
        </div>

        {/* Total Orders */}
        <div className="p-5 rounded-2xl bg-[#0a192f] border border-slate-800/80 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Total Orders
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <ShoppingCart className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white">{stats.totalOrders}</div>
          <div className="mt-2 text-xs text-slate-400 flex items-center gap-2">
            <span className="text-amber-400 font-semibold">{stats.pendingOrders} Pending</span>
            <span>•</span>
            <span className="text-blue-400 font-semibold">{stats.processingOrders} Processing</span>
          </div>
        </div>

        {/* Active Products */}
        <div className="p-5 rounded-2xl bg-[#0a192f] border border-slate-800/80 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Total Catalog
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white">{stats.totalProducts}</div>
          <div className="mt-2 text-xs text-slate-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>{stats.inStockProducts} in stock available</span>
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="p-5 rounded-2xl bg-[#0a192f] border border-slate-800/80 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Inventory Alert
            </span>
            <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-rose-400">{stats.lowStockProducts}</div>
          <div className="mt-2 text-xs text-slate-400 flex items-center gap-1.5">
            <span>Items with ≤ 5 units left</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Recent Orders & Inventory Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders (2 Columns) */}
        <div className="lg:col-span-2 rounded-2xl bg-[#0a192f] border border-slate-800/80 overflow-hidden shadow-xl">
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingCart className="w-5 h-5 text-amber-400" />
              <h2 className="font-bold text-base text-white">Recent Orders</h2>
            </div>
            <Link
              href="/admin/orders"
              className="text-xs font-semibold text-[#02A5F2] hover:text-white flex items-center gap-1 transition-colors"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-800/80">
            {stats.recentOrders.map((order) => {
              const statusColor =
                order.status === "completed"
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                  : order.status === "processing"
                  ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                  : order.status === "cancelled"
                  ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                  : "bg-amber-500/10 text-amber-400 border-amber-500/20";

              return (
                <div
                  key={order.id}
                  className="p-4 hover:bg-slate-800/30 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-slate-300 shrink-0">
                      #{order.id}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white text-sm">
                          {order.customer_name}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase border ${statusColor}`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        {order.order_number} • {order.customer_phone} • {order.city}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                    <div className="text-right">
                      <div className="font-bold text-white text-sm">
                        ৳{order.total_amount.toLocaleString()}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {order.items?.length || 0} items • {order.payment_method}
                      </div>
                    </div>
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-[#0067E0] text-slate-200 hover:text-white transition-all"
                    >
                      Manage
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Low Stock Alert Sidebar (1 Column) */}
        <div className="rounded-2xl bg-[#0a192f] border border-slate-800/80 overflow-hidden shadow-xl flex flex-col">
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <h2 className="font-bold text-base text-white">Low Stock Items</h2>
            </div>
            <Link
              href="/admin/products?stock=out_of_stock"
              className="text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              Filter
            </Link>
          </div>

          <div className="divide-y divide-slate-800/80 flex-1">
            {stats.lowStockList.map((prod) => (
              <div key={prod.id} className="p-3.5 hover:bg-slate-800/30 transition-colors flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-slate-900 border border-slate-800 relative overflow-hidden shrink-0">
                  {prod.primary_image ? (
                    <Image
                      src={prod.primary_image}
                      alt={prod.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-600">
                      No Pic
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-white truncate">{prod.name}</p>
                  <p className="text-[11px] text-slate-500">{prod.sku}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
                      {prod.stock_count} in stock
                    </span>
                    <span className="text-xs font-semibold text-slate-300">
                      ৳{prod.price.toLocaleString()}
                    </span>
                  </div>
                </div>
                <Link
                  href={`/admin/products/${prod.id}/edit`}
                  className="px-2.5 py-1 rounded text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 shrink-0"
                >
                  Edit
                </Link>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-slate-800 bg-[#0d223f]/40">
            <Link
              href="/admin/products"
              className="w-full py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 text-center block transition-colors"
            >
              View Full Product Catalog ({stats.totalProducts})
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
