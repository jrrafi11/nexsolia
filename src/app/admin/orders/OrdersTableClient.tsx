"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  ShoppingCart,
  Eye,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Truck,
} from "lucide-react";
import type { Order } from "@/lib/db";

interface Props {
  initialOrders: Order[];
  total: number;
  currentPage: number;
  totalPages: number;
  currentSearch?: string;
  currentStatus?: string;
}

export default function OrdersTableClient({
  initialOrders,
  total,
  currentPage,
  totalPages,
  currentSearch = "",
  currentStatus = "all",
}: Props) {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [search, setSearch] = useState(currentSearch);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const applyFilters = (newParams?: { s?: string; st?: string; p?: number }) => {
    const s = newParams?.s !== undefined ? newParams.s : search;
    const st = newParams?.st !== undefined ? newParams.st : currentStatus;
    const p = newParams?.p !== undefined ? newParams.p : 1;

    const params = new URLSearchParams();
    if (s) params.set("search", s);
    if (st && st !== "all") params.set("status", st);
    if (p > 1) params.set("page", String(p));

    router.push(`/admin/orders?${params.toString()}`);
  };

  const handleStatusChange = async (orderId: number, nextStatus: Order["status"]) => {
    setUpdatingId(orderId);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });
      const data = await res.json();
      if (data.success && data.order) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? data.order : o))
        );
      }
    } catch {
      alert("Error updating order status");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (orderId: number, orderNum: string) => {
    if (!confirm(`Delete order ${orderNum}?`)) return;
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setOrders((prev) => prev.filter((o) => o.id !== orderId));
      } else {
        alert(data.error || "Failed to delete order");
      }
    } catch {
      alert("Error deleting order");
    }
  };

  const statusTabs = [
    { id: "all", label: "All Orders" },
    { id: "pending", label: "Pending" },
    { id: "processing", label: "Processing" },
    { id: "completed", label: "Completed" },
    { id: "cancelled", label: "Cancelled" },
  ];

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-800">
        {statusTabs.map((tab) => {
          const isActive = (currentStatus || "all") === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => applyFilters({ st: tab.id, p: 1 })}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? "bg-[#0067E0] text-white shadow-lg shadow-[#0067E0]/20"
                  : "bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Search Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          applyFilters({ p: 1 });
        }}
        className="flex gap-3"
      >
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by order number (e.g. NEX-1049), customer name, or phone..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-[#02A5F2]"
          />
        </div>
        <button
          type="submit"
          className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-[#0067E0] hover:bg-[#014898] text-white transition-colors"
        >
          Search
        </button>
      </form>

      {/* Orders Table */}
      <div className="rounded-2xl bg-[#0a192f] border border-slate-800 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-900/80 border-b border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              <tr>
                <th className="p-4">Order #</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Delivery City & Address</th>
                <th className="p-4">Items & Total</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500">
                    No orders found.
                  </td>
                </tr>
              ) : (
                orders.map((o) => {
                  const isUpdating = updatingId === o.id;

                  return (
                    <tr key={o.id} className="hover:bg-slate-800/30 transition-colors">
                      {/* Order Number */}
                      <td className="p-4 font-bold text-white font-mono">
                        <Link
                          href={`/admin/orders/${o.id}`}
                          className="hover:text-[#02A5F2] transition-colors"
                        >
                          {o.order_number}
                        </Link>
                      </td>

                      {/* Customer */}
                      <td className="p-4">
                        <div className="font-semibold text-white text-sm">
                          {o.customer_name}
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5">
                          {o.customer_phone}
                        </div>
                      </td>

                      {/* Address */}
                      <td className="p-4 max-w-[220px]">
                        <div className="text-xs text-slate-300 font-medium">{o.city}</div>
                        <div className="text-[11px] text-slate-500 truncate mt-0.5">
                          {o.shipping_address}
                        </div>
                      </td>

                      {/* Items & Total */}
                      <td className="p-4">
                        <div className="font-bold text-white text-sm">
                          ৳{o.total_amount.toLocaleString()}
                        </div>
                        <div className="text-xs text-slate-400">
                          {o.items?.length || 0} items • {o.payment_method}
                        </div>
                      </td>

                      {/* Status Dropdown */}
                      <td className="p-4">
                        <select
                          value={o.status}
                          disabled={isUpdating}
                          onChange={(e) =>
                            handleStatusChange(o.id, e.target.value as Order["status"])
                          }
                          className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg border focus:outline-none ${
                            o.status === "completed"
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                              : o.status === "processing"
                              ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
                              : o.status === "cancelled"
                              ? "bg-rose-500/10 text-rose-400 border-rose-500/30"
                              : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                          }`}
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>

                      {/* Date */}
                      <td className="p-4 text-xs text-slate-400 whitespace-nowrap">
                        {new Date(o.created_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>

                      {/* Actions */}
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/orders/${o.id}`}
                            className="p-2 rounded-lg bg-slate-800 hover:bg-[#0067E0] text-slate-300 hover:text-white transition-colors"
                            title="View order details"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(o.id, o.order_number)}
                            className="p-2 rounded-lg bg-rose-600/20 hover:bg-rose-600 text-rose-400 hover:text-white transition-colors"
                            title="Delete order"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-slate-800 flex items-center justify-between text-sm text-slate-400">
            <div>
              Page <span className="text-white font-semibold">{currentPage}</span> of{" "}
              <span className="text-white font-semibold">{totalPages}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => applyFilters({ p: currentPage - 1 })}
                disabled={currentPage <= 1}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 disabled:opacity-40 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => applyFilters({ p: currentPage + 1 })}
                disabled={currentPage >= totalPages}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 disabled:opacity-40 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
