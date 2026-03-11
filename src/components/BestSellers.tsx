import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { ProductGrid } from "@/components/ProductCard";
import { useProducts } from "@/hooks/useProducts";

const BestSellers = () => {
  const { t } = useI18n();
  const { data: products } = useProducts();

  const bestSellers = products?.filter(p => p.badge === "bestseller" || p.badge === "new").slice(0, 4) ?? [];

  if (bestSellers.length === 0) return null;

  return (
    <section className="section-padding bg-card">
      <motion.h2
        className="text-center text-2xl md:text-4xl font-display uppercase tracking-[0.2em] mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {t("bestsellers.title")}
      </motion.h2>
      <ProductGrid items={bestSellers.map(p => ({
        id: p.slug,
        name: p.name,
        price: Number(p.price),
        collection: p.collection as any,
        badge: p.badge as any,
        sizes: p.sizes || [],
        colors: p.colors || [],
        description: p.description,
        image: p.image_url,
      }))} />
    </section>
  );
};

export default BestSellers;
