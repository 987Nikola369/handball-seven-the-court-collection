import { useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { ProductGrid } from "@/components/ProductCard";
import { products } from "@/lib/products";
import { useI18n } from "@/lib/i18n";
import collectionsImg from "@/assets/collections-banner.png";

const Collections = () => {
  const { t } = useI18n();
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get("filter") || "all";

  const collections = [
    { id: "classic", name: t("col.classic"), desc: t("col.classic.desc") },
    { id: "vintage", name: t("col.vintage"), desc: t("col.vintage.desc") },
    { id: "kids", name: t("col.kids"), desc: t("col.kids.desc") },
  ];

  const filtered = useMemo(() => {
    return filter === "all" ? products : products.filter(p => p.collection === filter);
  }, [filter]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <CartDrawer />
      <main className="pt-20">
        {/* Hero Banner */}
        <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
          <img src={collectionsImg} alt="Collections" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 px-5 md:px-12 lg:px-20 pb-10">
            <motion.h1
              className="text-3xl md:text-5xl font-display uppercase tracking-[0.2em]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {t("featured.title")}
            </motion.h1>
          </div>
        </div>

        <div className="section-padding">
          {/* Collection Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {collections.map((col, i) => (
              <motion.button
                key={col.id}
                onClick={() => setSearchParams(col.id === filter ? {} : { filter: col.id })}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`text-left border p-8 transition-all duration-300 ${
                  filter === col.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
                }`}
              >
                <h3 className="font-display uppercase tracking-wider text-lg mb-2">{col.name}</h3>
                <p className="text-muted-foreground text-sm">{col.desc}</p>
              </motion.button>
            ))}
          </div>

          <ProductGrid items={filtered} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Collections;
