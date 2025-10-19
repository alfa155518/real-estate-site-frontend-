import type { Metadata } from "next";
import LoginForm from "./LoginForm";
import styles from "@/sass/pages/login.module.scss";

export const metadata: Metadata = {
  title: "تسجيل الدخول |  عالم العقارات",
  description: "صفحة تسجيل الدخول لمساعدتك على الوصول إلى حسابك بأمان.",
  keywords: ["تسجيل الدخول", "تسجيل", "حسابي", "عالم العقارات"],
};

const Login = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.logo}>
          <h1>تسجيل الدخول</h1>
          <p>مرحباً بعودتك! يرجى تسجيل الدخول إلى حسابك</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
