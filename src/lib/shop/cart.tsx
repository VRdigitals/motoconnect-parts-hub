import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { shopConfig } from "./config";
import type { Product } from "./types";

export interface CartLine {
  id: string;
  qty: number;
  /** Display snapshot only. Real price and stock are re-checked on the server at checkout. */
  name: string;
  price: number;
  imageUrl: string | null;
  stock: number | null;
}

interface CartContextValue {
  lines: CartLine[];
  count: number;
  subtotal: number;
  open: boolean;
  setOpen: (open: boolean) => void;
  add: (product: Product, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
}

const STORAGE_KEY = "motoconnect-cart-v1";
const CartContext = createContext<CartContextValue | null>(null);

const cap = (qty: number, stock: number | null) =>
  Math.max(1, Math.min(qty, shopConfig.maxQtyPerLine, stock === null ? Infinity : Math.max(stock, 1)));

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Load after mount so server and browser render the same HTML first.
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
      if (Array.isArray(saved)) setLines(saved.filter((l) => l && typeof l.id === "string" && l.qty > 0));
    } catch {
      /* ignore corrupt storage */
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* storage may be unavailable (private mode) */
    }
  }, [lines, loaded]);

  const add = useCallback((product: Product, qty = 1) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.id === product.id);
      if (existing) {
        return prev.map((l) => (l.id === product.id ? { ...l, qty: cap(l.qty + qty, product.stock), price: product.price, stock: product.stock } : l));
      }
      return [...prev, { id: product.id, qty: cap(qty, product.stock), name: product.name, price: product.price, imageUrl: product.imageUrl, stock: product.stock }];
    });
    setOpen(true);
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setLines((prev) => prev.map((l) => (l.id === id ? { ...l, qty: cap(qty, l.stock) } : l)));
  }, []);

  const remove = useCallback((id: string) => setLines((prev) => prev.filter((l) => l.id !== id)), []);
  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      count: lines.reduce((n, l) => n + l.qty, 0),
      subtotal: lines.reduce((sum, l) => sum + l.price * l.qty, 0),
      open,
      setOpen,
      add,
      setQty,
      remove,
      clear,
    }),
    [lines, open, add, setQty, remove, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
