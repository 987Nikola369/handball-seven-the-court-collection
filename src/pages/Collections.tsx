import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { Product3DGrid } from "@/components/Product3DCard";
import { useProducts } from "@/hooks/useProducts";
import { useCollections } from "@/hooks/useCollections";
import { useI18n } from "@/lib/i18n";
import collectionsImg from "@/assets/collections-banner.png";

const Collections = () => {
  const { t } = useI18n();
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get("filter") || "all";
  const { data: dbProducts } = useProducts();
  const { data: collections } = useCollections();

  const products = useMemo(() => {
    return (dbProducts ?? []).map(p => ({
      name: p.name,
      price: Number(p.price),
      modelUrl: p.image_url,
      slug: p.slug,
      badge: p.badge,
      collection: p.collection,
    }));
  }, [dbProducts]);

  const filtered = useMemo(() => {
    return filter === "all" ? products : products.filter(p => p.collection === filter);
  }, [filter, products]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <CartDrawer />
      <main className="pt-20">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {(collections ?? []).map((col, i) => (
              <motion.button
                key={col.slug}
                onClick={() => setSearchParams(col.slug === filter ? {} : { filter: col.slug })}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`text-left border p-8 transition-all duration-300 ${
                  filter === col.slug ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
                }`}
              >
                <h3 className="font-display uppercase tracking-wider text-lg mb-2">{col.name}</h3>
                <p className="text-muted-foreground text-sm">{col.description}</p>
              </motion.button>
            ))}
          </div>

          <Product3DGrid items={filtered} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Collections;
