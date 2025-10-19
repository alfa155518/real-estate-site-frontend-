import type { Metadata } from "next";
import SignupForm from "./SignupForm";
import styles from "@/sass/pages/signup.module.scss";

export const metadata: Metadata = {
  title: "انشاء حساب جديد |  عالم العقارات",
  description: "صفحة انشاء حساب لمساعدتك على الوصول إلى حسابك بأمان.",
  keywords: ["انشاء حساب", "انشاء", "حسابي", "عالم العقارات"],
};

const Signup = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.logo}>
          <h1> انشاء حساب جديد</h1>
          <p>سجل معنا لاستكشاف عالم العقارات </p>
        </div>
        <SignupForm />
      </div>
    </div>
  );
};

export default Signup;
