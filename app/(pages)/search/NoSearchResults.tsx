import { Search, Home } from "lucide-react";
import { useRouter } from "next/navigation";
import styles from "@/sass/pages/search/index.module.scss";
export default function NoSearchResults() {
  const router = useRouter();
  return (
    <div className={styles.noResults}>
      <div className={styles.icon}>
        <Search size={48} />
      </div>
      <h2>لا توجد نتائج</h2>
      <p>عذراً، لم نتمكن من العثور على أي عقارات تطابق بحثك.</p>
      <button
        className={styles.searchAgain}
        onClick={() => router.push("/realstate")}
      >
        <Home size={18} />
        العودة للرئيسية
      </button>
    </div>
  );
}
