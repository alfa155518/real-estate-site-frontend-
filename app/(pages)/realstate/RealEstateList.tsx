'use client';

import { motion } from 'framer-motion';
import { RealEstate } from '@/types/real-estate';
import RealEstateCard from '../../../components/common/RealEstateCard';
import styles from '@/sass/pages/real-estate/realEstateList.module.scss';

interface RealEstateListProps {
  properties: RealEstate[];
  loading?: boolean;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const RealEstateList = ({ properties, loading = false }: RealEstateListProps) => {
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner} />
        <p>جاري تحميل العقارات...</p>
      </div>
    );
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
          <RealEstateCard property={property} index={index} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default RealEstateList;
