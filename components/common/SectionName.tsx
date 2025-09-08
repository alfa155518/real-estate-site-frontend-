
'use client';
import { motion } from 'framer-motion';
import styles from '@/sass/components/common/sectionName.module.scss';
export default function SectionName({title, subtitle}: {title: string, subtitle?: string}) {
return (
    //  <motion.h2 
    //       className={styles.title}
    //       initial={{ opacity: 0, y: 20 }}
    //       whileInView={{ opacity: 1, y: 0 }}
    //       viewport={{ once: true }}
    //       transition={{ duration: 0.6 }}
    //     >
    //       {title}
    //     </motion.h2>
       <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>{subtitle}</p>
        </motion.div>
)
}