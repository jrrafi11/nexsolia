"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  User,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  Calendar,
  Save,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import type { Order } from "@/lib/db";

interface Props {
  order: Order;
}

export default function OrderDetailClient({ order }: Props) {
  const router = useRouter();
  const [status, setStatus] = useState<Order["status"]>(order.status);
  const [notes, setNotes] = useState(order.notes || "");
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleSave = async () => {
    setSaving(true);
    setSuccessMsg("");
    try {
      const res = await fetch(`/api/admin/orders/${order.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, notes }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMsg("Order status and notes updated successfully!");
        router.refresh();
      } else {
        alert(data.error || "Failed to update order");
      }
    } catch {
      alert("Error updating order");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/orders"
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-black text-white tracking-tight">
                Order {order.order_number}
              </h1>
              <span
                className={`text-xs font-bold px-2.5 py-1 rounded-full uppercase border ${
                  status === "completed"
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                    : status === "processing"
                    ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
                    : status === "cancelled"
                    ? "bg-rose-500/10 text-rose-400 border-rose-500/30"
                    : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                }`}
              >
                {status}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>
                Placed on{" "}
                {new Date(order.created_at).toLocaleString("en-US", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold bg-[#0067E0] hover:bg-[#014898] text-white shadow-lg shadow-[#0067E0]/25 transition-all disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? "Saving..." : "Save Order Status"}</span>
        </button>
      </div>

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm flex items-center gap-2 font-medium">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Grid: Order Items & Customer Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Order Items */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl bg-[#0a192f] border border-slate-800 shadow-xl overflow-hidden">
            <div className="p-5 border-b border-slate-800 font-bold text-base text-white">
              Ordered Items ({order.items?.length || 0})
            </div>

            <div className="divide-y divide-slate-800/80">
              {order.items?.map((item, idx) => (
                <div key={idx} className="p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-slate-900 border border-slate-800 relative overflow-hidden shrink-0">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-600">
                          No Pic
                        </div>
                      )}
                    </div>
                    <div>
                      <Link
                        href={`/product/${item.slug}`}
                        target="_blank"
                        className="font-bold text-white text-sm hover:text-[#02A5F2] transition-colors flex items-center gap-1.5"
                      >
                        <span>{item.name}</span>
                        <ExternalLink className="w-3 h-3 text-slate-500" />
                      </Link>
                      <div className="text-xs text-slate-400 mt-1">
                        ৳{item.price.toLocaleString()} × {item.quantity}
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="font-bold text-white text-sm">
                      ৳{(item.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Total Summary */}
            <div className="p-5 border-t border-slate-800 bg-slate-900/40 space-y-2 text-sm">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span className="text-white font-medium">৳{order.total_amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Shipping & Delivery (Nationwide)</span>
                <span className="text-emerald-400 font-medium">FREE</span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-white pt-2 border-t border-slate-800">
                <span>Total Amount</span>
                <span className="text-[#02A5F2]">৳{order.total_amount.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Admin Order Notes */}
          <div className="p-6 rounded-2xl bg-[#0a192f] border border-slate-800 shadow-xl space-y-3">
            <h2 className="font-bold text-base text-white">Order Notes & Instructions</h2>
            <textarea
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Internal notes or customer delivery requests..."
              className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-[#02A5F2]"
            />
          </div>
        </div>

        {/* Right 1 Col: Customer Details & Status */}
        <div className="space-y-6">
          {/* Order Status Control */}
          <div className="p-6 rounded-2xl bg-[#0a192f] border border-slate-800 shadow-xl space-y-4">
            <h2 className="font-bold text-base text-white border-b border-slate-800 pb-3">
              Order Status
            </h2>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Fulfillment Stage
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as Order["status"])}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm font-semibold text-white focus:outline-none focus:border-[#02A5F2]"
              >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Customer Details Card */}
          <div className="p-6 rounded-2xl bg-[#0a192f] border border-slate-800 shadow-xl space-y-4">
            <h2 className="font-bold text-base text-white border-b border-slate-800 pb-3">
              Customer Information
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <User className="w-4 h-4 text-[#02A5F2] mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs text-slate-400">Customer Name</div>
                  <div className="font-bold text-white">{order.customer_name}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#02A5F2] mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs text-slate-400">Phone Number</div>
                  <a
                    href={`tel:${order.customer_phone}`}
                    className="font-mono text-white hover:text-[#02A5F2] transition-colors"
                  >
                    {order.customer_phone}
                  </a>
                </div>
              </div>

              {order.customer_email && (
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#02A5F2] mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs text-slate-400">Email Address</div>
                    <div className="text-slate-300">{order.customer_email}</div>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#02A5F2] mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs text-slate-400">Delivery Address</div>
                  <div className="text-slate-200">{order.shipping_address}</div>
                  <div className="text-xs font-semibold text-white mt-0.5">
                    {order.city}, Bangladesh
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2 border-t border-slate-800">
                <CreditCard className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs text-slate-400">Payment Method</div>
                  <div className="font-semibold text-white">{order.payment_method}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
