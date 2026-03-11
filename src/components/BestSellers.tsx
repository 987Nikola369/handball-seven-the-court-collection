import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { Product3DGrid } from "@/components/Product3DCard";
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
      <Product3DGrid items={bestSellers.map(p => ({
        name: p.name,
        price: Number(p.price),
        modelUrl: p.image_url,
        slug: p.slug,
        badge: p.badge,
      }))} />
    </section>
  );
};

export default BestSellers;
