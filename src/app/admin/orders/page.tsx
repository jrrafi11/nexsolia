import React, { Suspense } from "react";
import { getOrders } from "@/lib/db";
import OrdersTableClient from "./OrdersTableClient";

interface Props {
  searchParams: Promise<{
    search?: string;
    status?: string;
    page?: string;
  }>;
}

function OrdersTableSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Tabs Skeleton */}
      <div className="flex gap-2 pb-1 border-b border-slate-800">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-8 w-24 bg-slate-900 rounded-xl" />
        ))}
      </div>

      {/* Search Bar Skeleton */}
      <div className="h-10 bg-slate-900 rounded-xl w-full" />

      {/* Table Skeleton */}
      <div className="rounded-2xl bg-[#0a192f] border border-slate-800 shadow-xl overflow-hidden p-4 space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex justify-between items-center py-2">
            <div className="h-4 bg-slate-800 rounded w-28" />
            <div className="h-4 bg-slate-800 rounded w-36" />
            <div className="h-4 bg-slate-900 rounded w-28" />
            <div className="h-4 bg-slate-900 rounded w-20" />
            <div className="h-6 bg-slate-900 rounded w-24" />
          </div>
        ))}
      </div>
    </div>
  );
}

async function OrdersContent({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  const search = resolvedParams.search || "";
  const status = resolvedParams.status || "all";
  const page = parseInt(resolvedParams.page || "1", 10);

  const { orders, total, totalPages } = await getOrders({
    search: search || undefined,
    status: status || undefined,
    page,
    limit: 20,
  });

  return (
    <OrdersTableClient
      initialOrders={orders}
      total={total}
      currentPage={page}
      totalPages={totalPages}
      currentSearch={search}
      currentStatus={status}
    />
  );
}

export default function AdminOrdersPage({ searchParams }: Props) {
  return (
    <div className="space-y-6">
      {/* Static Shell Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          Orders & Shipments
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Track customer orders, delivery status, invoices, and customer communications.
        </p>
      </div>

      {/* Dynamic Content Wrapped in Suspense */}
      <Suspense fallback={<OrdersTableSkeleton />}>
        <OrdersContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
