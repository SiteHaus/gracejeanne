"use client";

import { useState, useEffect } from "react";
import {
  ShoppingCart,
  X,
  Plus,
  Minus,
  ChevronDown,
  Loader2,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Product, PublicVariant, Cart, CartItem } from "@/lib/ecom/types";
import type { GalleryTag } from "@/lib/ecom/galleries";
import {
  getCart,
  addToCart as apiAddToCart,
  updateCartItem,
  removeCartItem,
  createCheckoutIntent,
} from "@/lib/ecom/client";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatPrice(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

function primaryVariant(product: Product): PublicVariant | null {
  return product.variants?.[0] ?? null;
}

const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Name A–Z", value: "name-asc" },
];

const emptyCart: Cart = {
  id: null,
  items: [],
  subtotalCents: 0,
  itemCount: 0,
  expiresAt: null,
};

// ─── Cart Drawer ──────────────────────────────────────────────────────────────

function CartDrawer({
  open,
  onClose,
  cart,
  onUpdateQty,
  onRemove,
  onCheckout,
  checkingOut,
  checkoutError,
}: {
  open: boolean;
  onClose: () => void;
  cart: Cart;
  onUpdateQty: (variantId: string, qty: number) => Promise<void>;
  onRemove: (variantId: string) => Promise<void>;
  onCheckout: () => Promise<void>;
  checkingOut: boolean;
  checkoutError: string | null;
}) {
  const [busyId, setBusyId] = useState<string | null>(null);

  const handleUpdateQty = async (variantId: string, qty: number) => {
    setBusyId(variantId);
    try {
      await onUpdateQty(variantId, qty);
    } finally {
      setBusyId(null);
    }
  };

  const handleRemove = async (variantId: string) => {
    setBusyId(variantId);
    try {
      await onRemove(variantId);
    } finally {
      setBusyId(null);
    }
  };

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-surface z-50 shadow-2xl border-l border-border flex flex-col transition-transform duration-300 ease-in-out ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <div>
            <div className="w-6 h-0.5 bg-primary rounded-full mb-1" />
            <h2 className="text-xl">Your Cart</h2>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4">
          {cart.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
              <ShoppingCart size={40} className="text-white/25" />
              <p className="text-muted-foreground text-sm">Your cart is empty.</p>
              <button
                onClick={onClose}
                className="text-primary text-sm font-semibold hover:underline"
              >
                Continue Shopping <ArrowRight className="h-3 w-3 inline" />
              </button>
            </div>
          ) : (
            cart.items.map((item: CartItem) => {
              const isBusy = busyId === item.variantId;
              return (
                <div
                  key={item.variantId}
                  className="flex gap-4 items-start border-b border-border pb-4"
                >
                  {item.primaryImageUrl ? (
                    <Image
                      src={item.primaryImageUrl}
                      alt={item.productName}
                      width={64}
                      height={64}
                      className="w-16 h-16 rounded-sm object-cover border border-border flex-shrink-0"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-sm bg-muted flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground leading-tight">
                      {item.productName}
                    </p>
                    <p className="text-xs text-muted-foreground mb-2">
                      {formatPrice(item.priceCents)} each
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          handleUpdateQty(item.variantId, item.quantity - 1)
                        }
                        disabled={isBusy}
                        className="w-6 h-6 rounded-full border border-white/15 flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors disabled:opacity-40"
                      >
                        <Minus size={10} />
                      </button>
                      <span className="text-sm font-medium text-foreground w-4 text-center">
                        {isBusy ? (
                          <Loader2 size={12} className="animate-spin mx-auto" />
                        ) : (
                          item.quantity
                        )}
                      </span>
                      <button
                        onClick={() =>
                          handleUpdateQty(item.variantId, item.quantity + 1)
                        }
                        disabled={isBusy}
                        className="w-6 h-6 rounded-full border border-white/15 flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors disabled:opacity-40"
                      >
                        <Plus size={10} />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <p className="text-sm font-bold text-foreground">
                      {formatPrice(item.lineTotalCents)}
                    </p>
                    <button
                      onClick={() => handleRemove(item.variantId)}
                      disabled={isBusy}
                      className="text-white/25 hover:text-red-400 transition-colors disabled:opacity-40"
                    >
                      {isBusy ? (
                        <Loader2 size={14} className="animate-spin" />
                      ) : (
                        <X size={14} />
                      )}
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {cart.items.length > 0 && (
          <div className="px-6 py-5 border-t border-border flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Subtotal</span>
              <span className="text-lg font-bold text-white">
                {formatPrice(cart.subtotalCents)}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Shipping and taxes calculated at checkout.
            </p>
            <button
              onClick={onCheckout}
              disabled={checkingOut}
              className="w-full bg-primary text-primary-foreground text-xs uppercase tracking-[0.22em] font-medium py-3.5 rounded-sm hover:brightness-110 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {checkingOut ? (
                <>
                  <Loader2 size={15} className="animate-spin" /> Redirecting…
                </>
              ) : (
                "Checkout"
              )}
            </button>
            {checkoutError && (
              <p className="text-xs text-destructive text-center -mt-2">
                {checkoutError}
              </p>
            )}
            <button
              onClick={onClose}
              className="w-full text-center text-sm text-muted-foreground hover:text-white transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────

function ProductCard({
  product,
  galleries,
  onAdd,
}: {
  product: Product;
  galleries: GalleryTag[];
  onAdd: (variantId: string) => Promise<void>;
}) {
  const [state, setState] = useState<"idle" | "adding" | "added" | "error">(
    "idle",
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const variant = primaryVariant(product);
  const outOfStock = variant?.availability === "out_of_stock";

  const handleAdd = async () => {
    if (!variant || outOfStock || state === "adding") return;
    setState("adding");
    setErrorMsg(null);
    try {
      await onAdd(variant.id);
      setState("added");
      setTimeout(() => setState("idle"), 1500);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to add";
      setErrorMsg(msg);
      setState("error");
      setTimeout(() => {
        setState("idle");
        setErrorMsg(null);
      }, 3000);
    }
  };

  return (
    <div className="flex flex-col group">
      <Link href={`/shop/${product.id}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-card shadow-[0_10px_30px_rgba(0,0,0,0.45)]">
          {product.primaryImage ? (
            <Image
              src={product.primaryImage.cdnUrl}
              alt={product.primaryImage.altText ?? product.name}
              fill
              className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-muted" />
          )}
          {variant?.availability === "low_stock" && (
            <span className="absolute top-3 left-3 bg-black/60 text-white text-[10px] uppercase tracking-[0.18em] px-2.5 py-1">
              Low Stock
            </span>
          )}
        </div>

        <div className="pt-5 pb-3 flex flex-col items-center text-center gap-1">
          {galleries.length > 0 && (
            <div className="flex flex-wrap justify-center gap-1.5 mb-1">
              {galleries.map((g) => (
                <span
                  key={g.slug}
                  className="text-[10px] uppercase tracking-[0.18em] text-accent-gold border border-accent-gold/40 px-2.5 py-0.5 rounded-full"
                >
                  {g.name}
                </span>
              ))}
            </div>
          )}
          <h3 className="text-lg leading-snug group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          {product.description && (
            <p className="text-xs text-muted-foreground leading-relaxed mt-1 line-clamp-2">
              {product.description}
            </p>
          )}
        </div>
      </Link>

      <div className="pb-2 flex flex-col gap-3 flex-1 justify-end">
        <div className="flex items-center justify-between pt-3 border-t border-border">
          {variant ? (
            <div className="flex flex-col">
              <span className="text-base text-white">
                {formatPrice(variant.priceCents)}
              </span>
              {variant.compareAtCents &&
                variant.compareAtCents > variant.priceCents && (
                  <span className="text-xs text-muted-foreground line-through">
                    {formatPrice(variant.compareAtCents)}
                  </span>
                )}
            </div>
          ) : (
            <span className="text-sm text-muted-foreground">—</span>
          )}

          <button
            onClick={handleAdd}
            disabled={!variant || outOfStock || state === "adding"}
            className={`text-[11px] uppercase tracking-[0.18em] px-4 py-2 rounded-sm border transition-all duration-200 flex items-center gap-1.5 ${
              outOfStock
                ? "border-border text-muted-foreground cursor-not-allowed"
                : state === "adding"
                  ? "border-primary/60 text-primary/70 cursor-wait"
                  : state === "added"
                    ? "border-green-500 bg-green-500/15 text-green-400"
                    : state === "error"
                      ? "border-destructive text-destructive"
                      : "border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            }`}
          >
            {state === "adding" && (
              <Loader2 size={12} className="animate-spin" />
            )}
            {outOfStock
              ? "Out of Stock"
              : state === "adding"
                ? "Adding…"
                : state === "added"
                  ? "Added ✓"
                  : state === "error"
                    ? (errorMsg ?? "Error")
                    : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Client Component ────────────────────────────────────────────────────

export default function ShopClient({
  products,
  galleriesByProduct = {},
}: {
  products: Product[];
  galleriesByProduct?: Record<string, GalleryTag[]>;
}) {
  const [cart, setCart] = useState<Cart>(emptyCart);
  const [cartOpen, setCartOpen] = useState(false);
  const [sortBy, setSortBy] = useState("featured");
  const [sortOpen, setSortOpen] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  useEffect(() => {
    getCart()
      .then(setCart)
      .catch(() => {
        /* no active cart — stay empty */
      });
  }, []);

  const addToCart = async (variantId: string) => {
    const updated = await apiAddToCart(variantId, 1);
    setCart(updated);
  };

  const updateQty = async (variantId: string, qty: number) => {
    const updated =
      qty <= 0
        ? await removeCartItem(variantId)
        : await updateCartItem(variantId, qty);
    setCart(updated);
  };

  const removeItem = async (variantId: string) => {
    const updated = await removeCartItem(variantId);
    setCart(updated);
  };

  const handleCheckout = async () => {
    setCheckingOut(true);
    setCheckoutError(null);
    try {
      const origin = window.location.origin;
      const result = await createCheckoutIntent({
        successUrl: `${origin}/shop/order-confirmation`,
        cancelUrl: `${origin}/shop`,
      });
      window.location.href = result.checkoutUrl;
    } catch (err) {
      setCheckingOut(false);
      setCheckoutError(
        err instanceof Error
          ? err.message
          : "Checkout failed. Please try again.",
      );
    }
  };

  const sorted = [...products].sort((a, b) => {
    const aPrice = primaryVariant(a)?.priceCents ?? 0;
    const bPrice = primaryVariant(b)?.priceCents ?? 0;
    if (sortBy === "price-asc") return aPrice - bPrice;
    if (sortBy === "price-desc") return bPrice - aPrice;
    if (sortBy === "name-asc") return a.name.localeCompare(b.name);
    return 0;
  });

  return (
    <div className="w-full text-white">
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdateQty={updateQty}
        onRemove={removeItem}
        onCheckout={handleCheckout}
        checkingOut={checkingOut}
        checkoutError={checkoutError}
      />

      {/* ── Hero ── */}
      <section className="px-6 pt-14 pb-12 md:pt-20 md:pb-16">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-5">
          <h1 className="text-3xl md:text-4xl">Shop Fine Art Prints</h1>
          <p className="text-base md:text-lg leading-relaxed text-foreground/80">
            Every photograph is printed to order on archival materials, ready
            to frame and hang.
          </p>
        </div>
      </section>

      {/* ── Sort Bar ── */}
      <section className="bg-background/90 backdrop-blur border-y border-border px-6 py-4 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {products.length} product{products.length !== 1 ? "s" : ""}
          </p>
          <div className="relative z-40">
            <div className="flex gap-2">
              <button
                onClick={() => setSortOpen((o) => !o)}
                className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground hover:text-white transition-colors border border-white/15 rounded-sm px-3 py-2"
              >
                {sortOptions.find((o) => o.value === sortBy)?.label}
                <ChevronDown
                  size={14}
                  className={`transition-transform ${sortOpen ? "rotate-180" : ""}`}
                />
              </button>
              <button
                onClick={() => setCartOpen(true)}
                className="relative flex-shrink-0 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground hover:text-white transition-colors border border-white/15 rounded-sm px-3 py-2"
              >
                <ShoppingCart size={14} />
                <span className="hidden sm:inline">Cart</span>
                {cart.itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {cart.itemCount}
                  </span>
                )}
              </button>
            </div>

            {sortOpen && (
              <div className="absolute right-0 top-full mt-1 bg-surface border border-border rounded-sm shadow-lg z-20 overflow-hidden min-w-[170px]">
                {sortOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      setSortBy(opt.value);
                      setSortOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-widest transition-colors ${
                      sortBy === opt.value
                        ? "text-primary bg-white/5"
                        : "text-muted-foreground hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Product Grid ── */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {sorted.length === 0 ? (
            <div className="text-center py-24 text-muted-foreground">
              <p className="text-lg">No prints available yet</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
              {sorted.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  galleries={galleriesByProduct[product.id] ?? []}
                  onAdd={addToCart}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── About the prints ── */}
      <section className="bg-surface py-16 px-6 border-t border-border">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-10 text-center">
          {[
            {
              label: "Archival Quality",
              detail: "Printed on museum-grade materials made to last.",
            },
            {
              label: "Made to Order",
              detail: "Each print is produced fresh for you, never pulled from stock.",
            },
            {
              label: "Questions?",
              detail: "Reach out for help choosing a size or finish.",
              href: "/contact",
            },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-3">
              <h2 className="text-base tracking-wider">{item.label}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                {item.detail}
              </p>
              {item.href && (
                <Link
                  href={item.href}
                  className="text-xs uppercase tracking-[0.2em] text-primary hover:text-white transition-colors"
                >
                  Contact
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
