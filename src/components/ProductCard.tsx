import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { products, Product } from "@/lib/products";
import { useCart } from "@/lib/cart";

export const ProductCard = ({ product }: { product: Product }) => {
  const { t } = useI18n();

  const badgeClass = product.badge === "new" ? "badge-new" 
    : product.badge === "bestseller" ? "badge-bestseller" 
    : product.badge === "vintage" ? "badge-vintage" : "";

  return (
    <Link to={`/product/${product.id}`} className="product-card block">
      <div className="product-card-image relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        {product.badge && (
          <span className={`absolute top-3 left-3 ${badgeClass}`}>
            {product.badge === "new" ? "New" : product.badge === "bestseller" ? "Best Seller" : "Vintage"}
          </span>
        )}
      </div>
      <div className="pt-4">
        <h3 className="font-display uppercase text-sm tracking-wider">{product.name}</h3>
        <p className="text-muted-foreground text-sm mt-1 font-body">€{product.price.toFixed(2)}</p>
      </div>
    </Link>
  );
};

export const ProductGrid = ({ items, columns = 4 }: { items: Product[]; columns?: number }) => {
  const colClass = columns === 3 ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4";
  return (
    <div className={`grid ${colClass} gap-5 md:gap-8`}>
      {items.map((product, i) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
        >
          <ProductCard product={product} />
        </motion.div>
      ))}
    </div>
  );
};
