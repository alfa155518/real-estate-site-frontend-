'use client';
import { motion, Variants } from 'framer-motion';
import { Building2, ShieldCheck, Handshake, Award, Users, Home } from 'lucide-react';
import styles from '@/sass/pages/about-us/features.module.scss';
import SectionName from '@/components/common/SectionName';

type FeatureItem = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
};

const features: FeatureItem[] = [
  {
    id: 'experience',
    title: 'سنوات من الخبرة',
    description: 'أكثر من 10 سنوات من الخبرة في سوق العقارات المحلي والدولي',
    icon: <Building2 className={styles.icon} />,
    delay: 0.1
  },
  {
    id: 'trust',
    title: 'ثقة العملاء',
    description: 'نحن نكسب ثقة عملائنا من خلال الشفافية والمصداقية',
    icon: <ShieldCheck className={styles.icon} />,
    delay: 0.2
  },
  {
    id: 'partnerships',
    title: 'شراكات قوية',
    description: 'شراكات استراتيجية مع أكبر المطورين العقاريين',
    icon: <Handshake className={styles.icon} />,
    delay: 0.3
  },
  {
    id: 'awards',
    title: 'جوائز وتكريمات',
    description: 'حاصلون على عدة جوائز كأفضل شركة عقارية',
    icon: <Award className={styles.icon} />,
    delay: 0.4
  },
  {
    id: 'clients',
    title: 'آلاف العملاء',
    description: 'أكثر من 5000 عميل راضٍ عن خدماتنا',
    icon: <Users className={styles.icon} />,
    delay: 0.5
  },
  {
    id: 'properties',
    title: 'ألف عقار',
    description: 'أكثر من 1000 عقار متاح للبيع والايجار',
    icon: <Home className={styles.icon} />,
    delay: 0.6
  }
];

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10
    }
  }
};

export default function Features() {
  return (
    <section className={styles.features} dir="rtl">
      <div>
        <SectionName title="لماذا تختارنا؟" subtitle="نحن نقدم أفضل الحلول العقارية لعملائنا الكرام" />
        <motion.div 
          className={styles.grid}
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          {features.map((feature) => (
            <motion.div 
              key={feature.id} 
              className={styles.card}
              variants={item}
              whileHover={{ y: -5 }}
            >
              <div className={styles.iconWrapper}>
                {feature.icon}
              </div>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardDescription}>{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}