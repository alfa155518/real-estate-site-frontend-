import type { Metadata } from "next";
import RealEstateContent from "./realestateContent";
import styles from "@/sass/pages/real-estate/realEstatePage.module.scss";
export const metadata: Metadata = {
  title: "العقارات |  عالم العقارات",
  description: "صفحة العقارات تصفح العقارات المفضلة لديك بسهولة.",
  keywords: ["العقارات", "عقارات", "عالم العقارات"],
};

export default function AllRealEstate() {
  return (
    <div className={styles.pageContainer} dir="rtl">
      <RealEstateContent />
    </div>
  );
}
