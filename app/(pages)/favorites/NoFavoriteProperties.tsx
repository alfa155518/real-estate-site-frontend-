import { motion } from "framer-motion";
import { ArrowLeft, HeartOff } from "lucide-react";
import Link from "next/link";
import styles from "@/sass/pages/favorites/favorites.module.scss";

export default function NoFavoriteProperties() {
  return (
    <motion.div
      className={styles.noFavorites}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <HeartOff size={64} className={styles.icon} />
      <h2>لا توجد عقارات في المفضلة</h2>
      <p>
        يمكنك إضافة العقارات إلى المفضلة بالنقر على زر القلب في صفحة تفاصيل
        العقار أو في صفحة العقارات
      </p>
      <Link href="/realstate" className={styles.browseButton}>
        <span>تصفح العقارات</span>
        <ArrowLeft size={18} />
      </Link>
    </motion.div>
  );
}
