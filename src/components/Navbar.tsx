import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingBag, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n, Lang } from "@/lib/i18n";
import { useCart } from "@/lib/cart";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, lang, setLang } = useI18n();
  const { totalItems, setIsOpen: setCartOpen } = useCart();
  const location = useLocation();

  const links = [
    { to: "/", label: t("nav.home") },
    { to: "/shop", label: t("nav.shop") },
    { to: "/collections", label: t("nav.collections") },
    { to: "/about", label: t("nav.about") },
    { to: "/contact", label: t("nav.contact") },
  ];

  const langs: { code: Lang; label: string }[] = [
    { code: "en", label: "EN" },
    { code: "de", label: "DE" },
    { code: "hr", label: "HR" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="flex items-center justify-between px-5 md:px-12 py-3">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Handball Seven" className="h-10 md:h-12" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`font-display uppercase text-xs tracking-[0.2em] transition-colors hover:text-primary ${
                location.pathname === link.to ? "text-primary" : "text-foreground/70"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {/* Language Switcher */}
          <div className="hidden md:flex items-center gap-1 text-xs font-display">
            {langs.map(l => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={`px-2 py-1 transition-colors ${lang === l.code ? "text-primary" : "text-foreground/40 hover:text-foreground/70"}`}
              >
                {l.label}
              </button>
            ))}
          </div>

          <button onClick={() => setCartOpen(true)} className="relative text-foreground/70 hover:text-foreground transition-colors">
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-body font-semibold">
                {totalItems}
              </span>
            )}
          </button>

          <button className="md:hidden text-foreground" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-t border-border overflow-hidden"
          >
            <div className="flex flex-col px-5 py-6 gap-4">
              {links.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={`font-display uppercase text-sm tracking-[0.2em] ${
                    location.pathname === link.to ? "text-primary" : "text-foreground/70"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex gap-2 pt-4 border-t border-border">
                {langs.map(l => (
                  <button
                    key={l.code}
                    onClick={() => setLang(l.code)}
                    className={`font-display text-xs px-3 py-1 border ${lang === l.code ? "border-primary text-primary" : "border-border text-foreground/40"}`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
