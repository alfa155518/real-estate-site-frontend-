import type { Metadata } from "next";
import SectionName from "@/components/common/SectionName";
import RenderedFavorites from "./RenderedFavorites";
import styles from "@/sass/pages/favorites/favorites.module.scss";

export const metadata: Metadata = {
  title: "قائمة المفضلة |  عالم العقارات",
  description: "صفحة قائمة المفضلة تصفح العقارات المفضلة لديك بسهولة.",
  keywords: ["قائمة المفضلة", "قائمة", "المفضلة", "عالم العقارات"],
};

export default function FavoritesPage() {
  return (
    <div className={styles.container}>
      <SectionName
        title="قائمة المفضلة"
        subtitle="تصفح العقارات المفضلة لديك بسهولة"
        className="mt-[8rem]"
      />
      <RenderedFavorites />
    </div>
  );
}
