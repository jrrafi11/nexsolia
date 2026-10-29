import React, { Suspense } from "react";
import { notFound } from "next/navigation";
import { getOrderById } from "@/lib/db";
import OrderDetailClient from "./OrderDetailClient";

interface Props {
  params: Promise<{ id: string }>;
}

async function OrderDetailContent({ params }: Props) {
  const { id } = await params;
  const order = await getOrderById(id);

  if (!order) {
    notFound();
  }

  return <OrderDetailClient order={order} />;
}

export default function AdminOrderDetailPage({ params }: Props) {
  return (
    <Suspense
      fallback={
        <div className="space-y-6 animate-pulse max-w-5xl mx-auto p-4">
          <div className="h-10 bg-slate-800 rounded-xl w-64" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 h-96 bg-[#0a192f] border border-slate-800 rounded-2xl" />
            <div className="h-96 bg-[#0a192f] border border-slate-800 rounded-2xl" />
          </div>
        </div>
      }
    >
      <OrderDetailContent params={params} />
    </Suspense>
  );
}
