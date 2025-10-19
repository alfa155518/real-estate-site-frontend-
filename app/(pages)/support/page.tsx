import type { Metadata } from "next";
import SectionName from "@/components/common/SectionName";
import SupportForm from "./SupportForm";
import styles from "@/sass/pages/support.module.scss";

export const metadata: Metadata = {
  title: "تواصل مع الدعم الفني |  عالم العقارات",
  description:
    "صفحة التواصل مع الدعم الفني لمساعدتك في أي استفسار أو مشكلة تتعلق بخدماتنا.",
  keywords: ["تواصل مع الدعم الفني", "تواصل", "دعم", "عالم العقارات"],
};

export default function Support() {
  return (
    <div className={styles.supportPage} dir="rtl">
      <SectionName
        title="تواصل مع الدعم الفني"
        subtitle="نحن هنا لمساعدتك! يرجى ملء النموذج أدناه وسنقوم بالرد عليك في أقرب وقت ممكن."
      />
      <SupportForm />
    </div>
  );
}
