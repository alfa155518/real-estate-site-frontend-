import {
  searchResultsContainerVariants,
  searchResultsItemVariants,
} from "@/components/animations/searchResults";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import styles from "@/sass/pages/search/index.module.scss";
import RealEstateCard from "@/components/common/RealEstateCard";
import { RealEstate } from "@/types/real-estate";

export default function SearchResultsList({
  filteredProperties,
}: {
  filteredProperties: RealEstate[];
}) {
  return (
    <motion.div
      className={styles.resultsGrid}
      variants={searchResultsContainerVariants}
      initial="hidden"
      animate="show"
    >
      <AnimatePresence>
        {filteredProperties.map((property, index) => (
          <motion.div
            key={property.id}
            variants={searchResultsItemVariants}
            layout
          >
            <RealEstateCard
              property={property}
              index={index % 10} // Reuse animation patterns
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
