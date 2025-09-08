
'use client';
import { motion } from 'framer-motion';
import styles from '@/sass/components/common/sectionName.module.scss';
export default function SectionName({title, subtitle, className}: {title: string, subtitle?: string, className?: string}) {
return (
       <motion.div 
          className={styles.header + " " + className}
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