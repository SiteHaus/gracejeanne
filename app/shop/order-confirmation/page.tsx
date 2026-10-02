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
    <div className="flex items-center justify-center px-6 py-24">
      <div className="max-w-md w-full bg-surface border border-border p-10 flex flex-col items-center text-center gap-6">
        <CheckCircle size={48} strokeWidth={1.25} className="text-primary" />

        <div>
          <h1 className="text-2xl md:text-3xl mb-3">
            Thank you
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Thank you for your purchase. You&apos;ll receive a confirmation
            email with your receipt shortly.
          </p>
        </div>

        {orderId && (
          <div className="border border-border px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Order #{orderId.slice(-8).toUpperCase()}
          </div>
        )}

        <Link
          href="/shop"
          className="w-full border border-primary text-primary hover:bg-primary hover:text-primary-foreground py-3 text-xs uppercase tracking-[0.22em] transition-colors text-center"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
