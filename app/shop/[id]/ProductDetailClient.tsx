"use client";

import { useState, useEffect, useMemo } from "react";
import {
  ShoppingCart,
  X,
  Plus,
  Minus,
  ChevronLeft,
  Loader2,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type {
  ProductDetail,
  PublicVariant,
  Cart,
  CartItem,
  Option,
} from "@/lib/ecom/types";
import {
  getCart,
  addToCart as apiAddToCart,
  updateCartItem,
  removeCartItem,
  createCheckoutIntent,
} from "@/lib/ecom/client";

function formatPrice(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

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

// ─── Option Picker ────────────────────────────────────────────────────────────

function getAvailableValueIds(
  option: Option,
  variants: PublicVariant[],
  selected: Record<string, string>,
): Set<string> {
  const available = new Set<string>();
  const otherSelected = Object.fromEntries(
    Object.entries(selected).filter(([k]) => k !== option.id),
  );
  for (const val of option.values) {
    const reachable = variants.some((variant) => {
      const variantValues = Object.fromEntries(
        variant.optionValues.map((ov) => [ov.optionId, ov.valueId]),
      );
      return (
        variantValues[option.id] === val.id &&
        Object.entries(otherSelected).every(([k, v]) => variantValues[k] === v)
      );
    });
    if (reachable) available.add(val.id);
  }
  return available;
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ProductDetailClient({
  product,
}: {
  product: ProductDetail;
}) {
  const [cart, setCart] = useState<Cart>(emptyCart);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [addState, setAddState] = useState<
    "idle" | "adding" | "added" | "error"
  >("idle");
  const [addError, setAddError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);

  // Default: select option values of the first available variant
  const [selected, setSelected] = useState<Record<string, string>>(() => {
    const defaults: Record<string, string> = {};
    const firstAvailable =
      product.variants?.find((v) => v.availability !== "out_of_stock") ??
      product.variants?.[0];
    if (firstAvailable) {
      for (const ov of firstAvailable.optionValues) {
        defaults[ov.optionId] = ov.valueId;
      }
    }
    return defaults;
  });

  useEffect(() => {
    getCart()
      .then(setCart)
      .catch(() => {});
  }, []);

  const selectedVariant = useMemo<PublicVariant | null>(() => {
    if (!product.variants) return null;
    if (product.options.length === 0) return product.variants[0] ?? null;
    return (
      product.variants.find((v) =>
        v.optionValues.every((ov) => selected[ov.optionId] === ov.valueId),
      ) ?? null
    );
  }, [product.variants, product.options, selected]);

  const updateQty = async (variantId: string, qty: number) => {
    const updated =
      qty <= 0
        ? await removeCartItem(variantId)
        : await updateCartItem(variantId, qty);
    setCart(updated);
  };

  const removeItem = async (variantId: string) => {
    setCart(await removeCartItem(variantId));
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

  const handleAddToCart = async () => {
    if (!selectedVariant || addState === "adding") return;
    setAddState("adding");
    setAddError(null);
    try {
      setCart(await apiAddToCart(selectedVariant.id, 1));
      setAddState("added");
      setTimeout(() => setAddState("idle"), 2000);
    } catch (err) {
      setAddError(err instanceof Error ? err.message : "Failed to add");
      setAddState("error");
      setTimeout(() => {
        setAddState("idle");
        setAddError(null);
      }, 3000);
    }
  };

  const outOfStock = selectedVariant?.availability === "out_of_stock";
  const noVariantSelected = product.options.length > 0 && !selectedVariant;

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

      {/* ── Nav bar ── */}
      <section className="px-6 pt-8 pb-2">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/shop"
            className="flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors"
          >
            <ChevronLeft size={14} strokeWidth={1.5} />
            Back to Shop
          </Link>
          <button
            onClick={() => setCartOpen(true)}
            className="relative flex items-center gap-2 border border-white/15 hover:border-white/40 text-muted-foreground hover:text-white text-xs uppercase tracking-[0.18em] px-3 py-2 rounded-sm transition-colors"
          >
            <ShoppingCart size={16} />
            <span className="hidden sm:inline">Cart</span>
            {cart.itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cart.itemCount}
              </span>
            )}
          </button>
        </div>
      </section>

      {/* ── Product Detail ── */}
      <section className="px-6 pt-8 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Images */}
            <div className="flex flex-col gap-3">
              {/* Natural aspect ratio: show the whole print, uncropped */}
              <div className="relative">
                {product.images[selectedImage] ? (
                  <Image
                    src={product.images[selectedImage].cdnUrl}
                    alt={product.images[selectedImage].altText ?? product.name}
                    width={1600}
                    height={1200}
                    className="w-full h-auto max-h-[75vh] object-contain object-left-top shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                ) : (
                  <div className="w-full aspect-[4/3] bg-muted flex items-center justify-center">
                    <span className="text-white/25 text-sm">No image</span>
                  </div>
                )}
              </div>

              {product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`relative w-16 h-16 flex-shrink-0 rounded-sm overflow-hidden border-2 transition-colors ${
                        selectedImage === i
                          ? "border-primary"
                          : "border-transparent"
                      }`}
                    >
                      <Image
                        src={img.cdnUrl}
                        alt={img.altText ?? product.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="flex flex-col gap-6">
              <div>
                {product.brand && (
                  <p className="text-xs uppercase tracking-[0.2em] text-primary mb-2">
                    {product.brand}
                  </p>
                )}
                <h1 className="text-3xl md:text-4xl leading-tight">
                  {product.name}
                </h1>
              </div>

              {product.description && (
                <p className="text-foreground/80 leading-relaxed">
                  {product.description}
                </p>
              )}

              {/* Option Pickers */}
              {product.options.length > 0 && product.variants && (
                <div className="flex flex-col gap-4">
                  {product.options.map((opt) => {
                    const available = getAvailableValueIds(
                      opt,
                      product.variants!,
                      selected,
                    );
                    return (
                      <div key={opt.id}>
                        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                          {opt.name}
                          {selected[opt.id] && (
                            <span className="ml-2 normal-case text-muted-foreground font-normal">
                              {
                                opt.values.find(
                                  (v) => v.id === selected[opt.id],
                                )?.value
                              }
                            </span>
                          )}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {opt.values.map((val) => {
                            const isSelected = selected[opt.id] === val.id;
                            const isAvailable = available.has(val.id);
                            return (
                              <button
                                key={val.id}
                                onClick={() =>
                                  setSelected((s) => ({
                                    ...s,
                                    [opt.id]: val.id,
                                  }))
                                }
                                disabled={!isAvailable}
                                className={`px-4 py-2 rounded-sm text-sm border transition-all ${
                                  isSelected
                                    ? "border-primary bg-primary text-primary-foreground"
                                    : isAvailable
                                      ? "border-white/15 bg-card text-foreground hover:border-primary hover:text-primary"
                                      : "border-border bg-background text-white/25 cursor-not-allowed line-through"
                                }`}
                              >
                                {val.value}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Price + Availability */}
              <div className="flex flex-col gap-1">
                {selectedVariant ? (
                  <>
                    <div className="flex items-baseline gap-3">
                      <span className="text-2xl font-light text-white">
                        {formatPrice(selectedVariant.priceCents)}
                      </span>
                      {selectedVariant.compareAtCents &&
                        selectedVariant.compareAtCents >
                          selectedVariant.priceCents && (
                          <span className="text-base text-muted-foreground line-through">
                            {formatPrice(selectedVariant.compareAtCents)}
                          </span>
                        )}
                    </div>
                    {selectedVariant.availability === "low_stock" && (
                      <p className="text-xs font-semibold text-primary">
                        Low stock — order soon
                      </p>
                    )}
                    {selectedVariant.availability === "out_of_stock" && (
                      <p className="text-xs font-semibold text-destructive">
                        Out of stock
                      </p>
                    )}
                  </>
                ) : noVariantSelected ? (
                  <span className="text-sm text-muted-foreground">
                    Select options above
                  </span>
                ) : (
                  <span className="text-sm text-muted-foreground">—</span>
                )}
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                disabled={
                  !selectedVariant || outOfStock || addState === "adding"
                }
                className={`w-full py-4 rounded-sm text-xs uppercase tracking-[0.22em] font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                  outOfStock || noVariantSelected
                    ? "bg-muted text-muted-foreground cursor-not-allowed"
                    : addState === "adding"
                      ? "bg-primary/70 text-primary-foreground cursor-wait"
                      : addState === "added"
                        ? "bg-green-500 text-white"
                        : addState === "error"
                          ? "bg-red-500 text-white"
                          : "bg-primary text-primary-foreground hover:brightness-110"
                }`}
              >
                {addState === "adding" && (
                  <Loader2 size={16} className="animate-spin" />
                )}
                {outOfStock
                  ? "Out of Stock"
                  : noVariantSelected
                    ? "Select Options"
                    : addState === "adding"
                      ? "Adding…"
                      : addState === "added"
                        ? "Added to Cart ✓"
                        : addState === "error"
                          ? (addError ?? "Error")
                          : "Add to Cart"}
              </button>

              {addState === "added" && (
                <button
                  onClick={() => setCartOpen(true)}
                  className="w-full text-center text-sm text-primary font-semibold hover:underline"
                >
                  View Cart <ArrowRight className="h-3 w-3 inline" />
                </button>
              )}

              {/* Trust signals */}
              <div className="border-t border-border pt-4 flex flex-col gap-1.5 text-xs text-muted-foreground">
                <p>Original photograph, taken on location by Grace Jeanne.</p>
                <p>
                  Questions about sizes or finishes?{" "}
                  <Link
                    href="/contact"
                    className="text-primary hover:text-white transition-colors"
                  >
                    Get in touch
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
