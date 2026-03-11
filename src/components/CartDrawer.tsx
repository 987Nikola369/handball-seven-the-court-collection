import { X, Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/cart";
import { useI18n } from "@/lib/i18n";

const CartDrawer = () => {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, totalPrice } = useCart();
  const { t } = useI18n();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-card border-l border-border z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="font-display uppercase tracking-widest text-lg">{t("nav.cart")}</h2>
              <button onClick={() => setIsOpen(false)} className="text-foreground/60 hover:text-foreground">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <p className="text-muted-foreground text-sm text-center py-12">Your cart is empty.</p>
              ) : (
                <div className="space-y-6">
                  {items.map(item => (
                    <div key={`${item.id}-${item.size}`} className="flex gap-4">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover bg-muted" />
                      <div className="flex-1">
                        <h3 className="font-display uppercase text-sm tracking-wider">{item.name}</h3>
                        <p className="text-muted-foreground text-xs mt-1">{t("shop.size")}: {item.size}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <button onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)} className="text-foreground/50 hover:text-foreground">
                            <Minus size={14} />
                          </button>
                          <span className="text-sm font-body">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)} className="text-foreground/50 hover:text-foreground">
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-display text-sm">€{(item.price * item.quantity).toFixed(2)}</p>
                        <button onClick={() => removeItem(item.id, item.size)} className="text-muted-foreground text-xs hover:text-foreground mt-2">
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-border">
                <div className="flex justify-between mb-4">
                  <span className="font-display uppercase tracking-wider text-sm">Total</span>
                  <span className="font-display text-lg">€{totalPrice.toFixed(2)}</span>
                </div>
                <button className="btn-primary w-full text-center">Checkout</button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
