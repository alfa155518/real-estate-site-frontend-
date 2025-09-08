'use client';

import { motion } from 'framer-motion';
import { 
  Home, 
  Star, 
  Users, 
  Award, 
  Building2, 
  Landmark, 
  Percent,
  Building,
  Building2 as Villa,
  Home as Apartment,
  Hammer,
  CalendarCheck
} from 'lucide-react';
import SectionName from '@/components/common/SectionName';
import styles from '@/sass/pages/home/statistics.module.scss';

// Define types for our statistics data
type StatItem = {
  id: number;
  icon: React.ReactNode;
  number: number | string;
  label: string;
  description: string;
};

// Animation variants for framer-motion
import { Variants } from 'framer-motion';


const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
};

const Statistics = () => {
  // Statistics data in Arabic
  const stats: StatItem[] = [
    {
      id: 1,
      icon: <Home size={32} />,
      number: '1,250+',
      label: 'عقار متاح',
      description: 'مجموعة واسعة من العقارات المتاحة للبيع أو الإيجار',
    },
    {
      id: 2,
      icon: <Star size={32} />,
      number: '98%',
      label: 'رضا العملاء',
      description: 'نسبة رضا عالية من عملائنا الكرام',
    },
    {
      id: 3,
      icon: <Users size={32} />,
      number: '24,500+',
      label: 'عميل راضي',
      description: 'انضم إلينا الآلاف من العملاء الراضين',
    },
    {
      id: 4,
      icon: <Award size={32} />,
      number: '28+',
      label: 'جائزة',
      description: 'حصلنا على جوائز في مجال العقارات',
    },
    {
      id: 5,
      icon: <Apartment size={32} />,
      number: '750+',
      label: 'شقة سكنية',
      description: 'مجموعة واسعة من الشقق السكنية المميزة',
    },
    {
      id: 6,
      icon: <Villa size={32} />,
      number: '350+',
      label: 'فيلا فاخرة',
      description: 'مجموعة منتقاة من الفلل الفاخرة',
    },
    {
      id: 7,
      icon: <Building2 size={32} />,
      number: '150+',
      label: 'مشروع عقاري',
      description: 'أحدث المشاريع العقارية المميزة',
    },
    {
      id: 8,
      icon: <Percent size={32} />,
      number: '95%',
      label: 'معدل النجاح',
      description: 'نسبة النجاح في صفقاتنا العقارية',
    },
    {
      id: 9,
      icon: <Building size={32} />,
      number: '200+',
      label: 'عقار تجاري',
      description: 'عقارات تجارية بمواقع استراتيجية',
    },
    {
      id: 10,
      icon: <Landmark size={32} />,
      number: '50+',
      label: 'أرض سكنية',
      description: 'قطع أراضي سكنية بمواقع متميزة',
    },
    {
      id: 11,
      icon: <Hammer size={32} />,
      number: '850+',
      label: 'صفقة منجزة',
      description: 'صفقات عقارية ناجحة',
    },
    {
      id: 12,
      icon: <CalendarCheck size={32} />,
      number: '15+',
      label: 'سنة خبرة',
      description: 'خبرة واسعة في السوق العقاري',
    },
  ];

  return (
    <section className={styles.statistics} id="statistics">
      <div>
        <SectionName title="إحصائياتنا"/>
        
        <motion.div 
          className={styles.statsGrid}
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {stats.map((stat) => (
            <motion.div 
              key={stat.id} 
              className={styles.statItem}
              variants={item}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.2 }
              }}
            >
              <div className={styles.iconContainer}>
                {stat.icon}
              </div>
              <h3 className={styles.statNumber}>
                {stat.number}
              </h3>
              <h4 className={styles.statLabel}>
                {stat.label}
              </h4>
              <p className={styles.statDescription}>
                {stat.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Statistics;