import { motion } from "framer-motion";

import SectionName from "@/components/common/SectionName";
import {
  StatisticsContainer,
  StatisticsItem,
} from "@/components/animations/statisticsCardAnimations";
import { stats } from "@/data/statistics";
import styles from "@/sass/pages/home/statistics.module.scss";

const Statistics = () => {
  return (
    <section className={styles.statistics} id="statistics">
      <div>
        <SectionName title="إحصائياتنا" />
        <motion.div
          className={styles.statsGrid}
          variants={StatisticsContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.id}
              className={styles.statItem}
              variants={StatisticsItem}
              whileHover={{
                y: -10,
                transition: { duration: 0.2 },
              }}
            >
              <div className={styles.iconContainer}>
                <stat.icon className={styles.icon} size={32} />
              </div>
              <h3 className={styles.statNumber}>{stat.number}</h3>
              <h4 className={styles.statLabel}>{stat.label}</h4>
              <p className={styles.statDescription}>{stat.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Statistics;
