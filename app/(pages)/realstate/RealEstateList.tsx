import { motion } from "framer-motion";
import { RealEstateListProps } from "@/types/real-estate";
import RealEstateCard from "../../../components/common/RealEstateCard";
import { SpinnerOne } from "@/components/ui/loader";
import {
  container,
  item,
} from "@/components/animations/realEstateListAnimations";
import styles from "@/sass/pages/real-estate/realEstateList.module.scss";

const RealEstateList = ({ properties, loading }: RealEstateListProps) => {
  if (loading) {
    return <SpinnerOne text="جاري تحميل العقارات..." />;
  }

  if (!properties.length) {
    return (
      <div className={styles.emptyState}>
        <p>لا توجد عقارات متاحة حالياً</p>
      </div>
    );
  }

  return (
    <motion.div
      className={styles.gridContainer}
      variants={container}
      initial="hidden"
      animate="show"
    >
      {properties.map((property, index) => (
        <motion.div key={property.id} variants={item}>
          <RealEstateCard property={property} index={index}>
            <RealEstateCard.contact property={property} />
            <RealEstateCard.favorite property={property} />
            <RealEstateCard.details property={property} />
          </RealEstateCard>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default RealEstateList;
