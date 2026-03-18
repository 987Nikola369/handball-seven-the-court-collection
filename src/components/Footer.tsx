import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { Instagram, MessageCircle } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  const { t, getSiteContent } = useI18n();

  const socials = getSiteContent("socials") as Record<string, string> | undefined;
  const featuresBar = getSiteContent("features_bar") as { items?: { icon: string; label: Record<string, string> }[] } | undefined;

  const whatsappNumber = socials?.whatsapp || "+385955144085";
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}`;

  return (
    <footer className="bg-card border-t border-border">
      {/* Features Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 border-b border-border">
        {(() => {
          const defaults = [
            { icon: "💥", title: "Foul", label: "No easy plays." },
            { icon: "✌️", title: "2 Minutes", label: "Take a moment." },
            { icon: "🟨", title: "Yellow Card", label: "Limited pieces." },
            { icon: "🟥", title: "Red Card", label: "When it's gone, it's gone." },
          ];
          const cmsItems = featuresBar?.items as { icon?: string; title?: string; label?: string | Record<string, string> }[] | undefined;
          return defaults.map((d, i) => {
            const cms = cmsItems?.[i];
            const icon = cms?.icon || d.icon;
            const title = cms?.title || d.title;
            const label = cms?.label
              ? (typeof cms.label === "object" ? (cms.label as any).hr || d.label : cms.label)
              : d.label;
            return (
              <motion.div
                key={i}
                className="flex flex-col items-center justify-center gap-1 py-4 px-2 sm:px-3 border-r border-border last:border-r-0 text-center"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <span className="text-lg">{icon}</span>
                <span className="font-display text-[10px] sm:text-xs uppercase tracking-wider text-foreground/80">{title}</span>
                <span className="text-[9px] sm:text-[10px] text-foreground/50 leading-tight">{label}</span>
              </motion.div>
            );
          });
        })()}
      </div>

      <div className="px-5 md:px-12 lg:px-20 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <motion.div
            className="col-span-2 md:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img src={logo} alt="Handball Seven" className="h-10 md:h-12 mb-4" />
            <p className="text-muted-foreground text-sm leading-relaxed">{t("footer.tagline")}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <h4 className="text-xs tracking-[0.2em] mb-4">{t("footer.support")}</h4>
            <div className="space-y-3">
              {[t("footer.shipping"), t("footer.faq"), t("footer.privacy"), t("footer.terms")].map(item => (
                <p key={item} className="text-muted-foreground text-sm hover:text-foreground transition-colors cursor-pointer py-0.5">{item}</p>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h4 className="text-xs tracking-[0.2em] mb-4">{t("footer.shop")}</h4>
            <div className="space-y-3">
              {[t("col.classic"), t("col.vintage"), t("col.street")].map(item => (
                <Link key={item} to="/shop" className="block text-muted-foreground text-sm hover:text-foreground transition-colors py-0.5">{item}</Link>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h4 className="text-xs tracking-[0.2em] mb-4">{t("footer.connect")}</h4>
            <div className="flex gap-4">
              {socials?.instagram ? (
                <a href={socials.instagram} target="_blank" rel="noopener noreferrer" className="text-foreground/40 hover:text-primary transition-colors p-1">
                  <Instagram size={22} />
                </a>
              ) : (
                <a href="#" className="text-foreground/40 hover:text-primary transition-colors p-1"><Instagram size={22} /></a>
              )}
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-foreground/40 hover:text-[#25D366] transition-colors p-1">
                <MessageCircle size={22} />
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="border-t border-border mt-10 md:mt-12 pt-6 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <p className="text-muted-foreground text-xs">© 2025 Handball Seven. {t("footer.rights")}</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
