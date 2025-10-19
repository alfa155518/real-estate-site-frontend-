import type { Metadata } from "next";
import PropertyContent from "./PropertyContent";
import styles from "@/sass/pages/single-realestate/singleRealEstate.module.scss";

export const metadata: Metadata = {
  title: "العقار |  عالم العقارات",
  description: "صفحة العقار تصفح العقار و تعرف على تفاصيله.",
  keywords: ["العقارات", "عقارات", "عالم العقارات"],
};

export default function SingleRealEstatePage() {
  return (
    <div className={styles.container}>
      <PropertyContent />
    </div>
  );
}
