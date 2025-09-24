import type { Metadata } from "next";
import { ResetParams } from "@/types/auth";
import ResetForm from "./ResetForm";

export const metadata: Metadata = {
  title: "إعادة تعيين كلمة المرور |  عالم العقارات",
  description:
    "صفحة إعادة تعيين كلمة المرور لمساعدتك على استعادة الوصول إلى حسابك بأمان.",
  keywords: [
    "إعادة تعيين كلمة المرور",
    "نسيت كلمة السر",
    "حسابي",
    "عالم العقارات",
  ],
};

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: ResetParams;
}) {
  const { token, email } = await searchParams;
  return <ResetForm token={token} email={email} />;
}
