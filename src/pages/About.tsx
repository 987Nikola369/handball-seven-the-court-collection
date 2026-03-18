import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { useI18n } from "@/lib/i18n";
import hoodieImg from "@/assets/hoodie-vintage.png";
import collectionsImg from "@/assets/collections-banner.png";

const About = () => {
  const { t, getSiteContent } = useI18n();
  const aboutContent = getSiteContent("about") as Record<string, any> | undefined;
  const mainImage = aboutContent?.main_image || hoodieImg;
  const bannerImage = aboutContent?.banner_image || collectionsImg;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <CartDrawer />
      <main className="pt-20">
        <div className="px-5 md:px-12 lg:px-20 py-10 md:py-16">
          <motion.h1
            className="text-2xl sm:text-3xl md:text-5xl font-display uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-8 md:mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {t("about.title")}
          </motion.h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center mb-16 md:mb-20">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-5 md:space-y-6 order-2 md:order-1"
            >
              <motion.p
                className="text-foreground/80 leading-relaxed text-sm md:text-base"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.6 }}
              >
                {t("about.p1")}
              </motion.p>
              <motion.p
                className="text-foreground/80 leading-relaxed text-sm md:text-base"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                {t("about.p2")}
              </motion.p>
              <motion.p
                className="text-foreground/80 leading-relaxed text-sm md:text-base"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                {t("about.p3")}
              </motion.p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 md:order-2"
            >
              <img src={mainImage} alt="Handball Seven" className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto" />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img src={bannerImage} alt="Collections" className="w-full" />
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
