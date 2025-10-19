"use client";
import { motion } from "framer-motion";
import styles from "@/sass/pages/about-us/features.module.scss";
import SectionName from "@/components/common/SectionName";
import { features } from "@/data/featureItems";
import {
  FeatureItem,
  FeatureItemsContainer,
} from "@/components/animations/FeatureItems";

export default function Features() {
  return (
    <section className={styles.features} dir="rtl">
      <SectionName
        title="لماذا تختارنا؟"
        subtitle="نحن نقدم أفضل الحلول العقارية لعملائنا الكرام"
        className="mt-[7rem]"
      />
      <motion.div
        className={styles.grid}
        variants={FeatureItemsContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
      >
        {features.map((feature) => (
          <motion.div
            key={feature.id}
            className={styles.card}
            variants={FeatureItem}
            whileHover={{ y: -5 }}
          >
            <div className={styles.iconWrapper}>
              <feature.icon className={styles.icon} size={32} />
            </div>

            <h3 className={styles.cardTitle}>{feature.title}</h3>
            <p className={styles.cardDescription}>{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
