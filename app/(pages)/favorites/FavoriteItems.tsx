import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import RealEstateCard from "@/components/common/RealEstateCard";
import styles from "@/sass/pages/favorites/favorites.module.scss";
import useFavoritePropertiesStore from "@/store/FavoritePropertiesStore";

export default function FavoriteItems() {
  const { favoriteProperties, handleToggleFavorite, loadingIds } =
    useFavoritePropertiesStore();
  return (
    <AnimatePresence>
      <div className={styles.grid}>
        {favoriteProperties.map((property, index) => (
          <motion.div
            key={property.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: index * 0.05 }}
            layout
          >
            <RealEstateCard property={property} index={index} />
            <motion.button
              className={styles.removeButton}
              onClick={() => handleToggleFavorite(property.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {loadingIds.includes(property.id) ? (
                <strong>.... جاري الازالة</strong>
              ) : (
                <>
                  <Heart size={18} fill="#ef4444" color="#ef4444" />
                  <span>إزالة من المفضلة</span>
                </>
              )}
            </motion.button>
          </motion.div>
        ))}
      </div>
    </AnimatePresence>
  );
}
