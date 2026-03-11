import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useI18n } from "@/lib/i18n";
import hoodieImg from "@/assets/hoodie-vintage.png";

const BrandStory = () => {
  const { t } = useI18n();

  return (
    <section className="section-padding">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <img src={hoodieImg} alt="Handball Seven Vintage Hoodie" className="w-full max-w-lg mx-auto" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl md:text-4xl font-display uppercase tracking-wider mb-6 leading-tight">
            {t("brand.title")}
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8 text-sm md:text-base">
            {t("brand.text")}
          </p>
          <Link to="/about" className="btn-outline inline-block">{t("brand.cta")}</Link>
        </motion.div>
      </div>
    </section>
  );
};

export default BrandStory;
