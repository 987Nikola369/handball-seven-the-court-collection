import React, { createContext, useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, PackageOpen } from "lucide-react";
import { useI18n } from "@/lib/i18n";

// ─── Webshop switch ──────────────────────────────────────────────────────────
// Set to false to reopen the shop. While true, every add-to-cart and checkout
// attempt shows the "rebuilding" notice instead of going through.
export const SHOP_CLOSED = true;

export type CartItem = {
  id: string;
  name: string;
  price: number;
  size: string;
  color?: string;
  collection?: string;
  design?: string;
  style?: string;
  quantity: number;
  image: string;
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string, size: string) => void;
  updateQuantity: (id: string, size: string, qty: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  shopClosed: boolean;
  showShopClosed: () => void;
};

const CartContext = createContext<CartContextType>({} as CartContextType);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [closedNoticeOpen, setClosedNoticeOpen] = useState(false);
  const { t } = useI18n();

  const showShopClosed = () => {
    setIsOpen(false);
    setClosedNoticeOpen(true);
  };

  const addItem = (item: CartItem) => {
    if (SHOP_CLOSED) {
      showShopClosed();
      return;
    }
    setItems(prev => {
      const existing = prev.find(i => i.id === item.id && i.size === item.size);
      if (existing) {
        return prev.map(i => i.id === item.id && i.size === item.size ? { ...i, quantity: i.quantity + item.quantity } : i);
      }
      return [...prev, item];
    });
    setIsOpen(true);
  };

  const removeItem = (id: string, size: string) => setItems(prev => prev.filter(i => !(i.id === id && i.size === size)));
  const updateQuantity = (id: string, size: string, qty: number) => {
    if (qty <= 0) return removeItem(id, size);
    setItems(prev => prev.map(i => i.id === id && i.size === size ? { ...i, quantity: qty } : i));
  };
  const clearCart = () => setItems([]);
  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = items.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isOpen,
        setIsOpen,
        shopClosed: SHOP_CLOSED,
        showShopClosed,
      }}
    >
      {children}

      <AnimatePresence>
        {closedNoticeOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setClosedNoticeOpen(false)}
              className="fixed inset-0 z-[398] bg-background/85 backdrop-blur-sm"
            />
            <div className="fixed inset-0 z-[400] flex items-center justify-center p-5 overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, y: 16, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16, scale: 0.97 }}
                transition={{ type: "tween", duration: 0.25 }}
                role="dialog"
                aria-modal="true"
                aria-labelledby="shop-closed-title"
                className="relative w-full max-w-md bg-card border border-border p-6 sm:p-8 text-center"
              >
                <button
                  onClick={() => setClosedNoticeOpen(false)}
                  aria-label="Close"
                  className="absolute top-2 right-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-foreground/50 hover:text-foreground"
                >
                  <X size={20} />
                </button>

                <div className="flex justify-center mb-5">
                  <span className="flex items-center justify-center w-14 h-14 border border-border text-primary">
                    <PackageOpen size={26} strokeWidth={1.5} />
                  </span>
                </div>

                <h2
                  id="shop-closed-title"
                  className="font-display uppercase tracking-[0.2em] text-base sm:text-lg leading-relaxed"
                >
                  {t("shop_closed.title")}
                </h2>

                <p className="font-body text-sm sm:text-base text-muted-foreground leading-relaxed mt-4">
                  {t("shop_closed.message")}
                </p>

                <button
                  onClick={() => setClosedNoticeOpen(false)}
                  className="btn-primary w-full min-h-[48px] mt-7 flex items-center justify-center"
                >
                  {t("shop_closed.button")}
                </button>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
