"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function OrderConfirmationPage() {
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setOrderId(params.get("orderId"));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-white rounded-2xl border border-gray-100 shadow-sm p-10 flex flex-col items-center text-center gap-6">
        <CheckCircle size={56} className="text-green-500" />

        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Order Placed!
          </h1>
          <p className="text-sm text-gray-500 leading-relaxed">
            Thank you for your purchase. You&apos;ll receive a confirmation
            email with your receipt shortly.
          </p>
        </div>

        {orderId && (
          <div className="bg-gray-50 rounded-xl px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-gray-500">
            Order #{orderId.slice(-8).toUpperCase()}
          </div>
        )}

        <Link
          href="/shop"
          className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity text-center text-sm"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
