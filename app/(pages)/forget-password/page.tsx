import type { Metadata } from "next";
import ForgetPasswordForm from "./ForgetPasswordFrom";

export const metadata: Metadata = {
  title: "نسيت كلمة المرور |  عالم العقارات",
  description:
    "صفحة نسيان كلمة المرور لمساعدتك على استعادة الوصول إلى حسابك بأمان.",
  keywords: ["نسيت كلمة المرور", "نسيت كلمة السر", "حسابي", "عالم العقارات"],
};

export default function ForgetPassword() {
  return <ForgetPasswordForm />;
}
