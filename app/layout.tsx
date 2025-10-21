import type { Metadata } from "next";
import { Noto_Sans_Arabic, Cairo } from "next/font/google";
import ConditionalLayout from "@/components/layout/ConditionalLayout";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const noto = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
  variable: "--font-noto",
});

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["600", "700"],
  display: "swap",
  variable: "--font-cairo",
});
export const metadata: Metadata = {
  title: "منصة عقارية متكاملة | ابحث عن شقة، فيلا، أو عقار تجاري بسهولة",
  description: "منصة عقارية ذكية مدعومة بتقنية NextJS لتجربة تصفح فائقة السرعة والسلاسة.",
  keywords: ["عقارات", "شقق للبيع", "فلل", "مكاتب تجارية", "NextJS"],
  openGraph: {
    title: "منصة عقارية متكاملة",
    description: "منصة عقارية ذكية مدعومة بتقنية NextJS لتجربة تصفح فائقة السرعة والسلاسة.",
    locale: "ar_AR",
    type: "website",
  },
};

export const viewport = {
    viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${noto.variable} ${cairo.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
        <Toaster
          toastOptions={{
            duration: 5000,
            style: {
              fontSize: '18px',
              fontWeight: '500',
            },
          }}
        />
      </body>
    </html>
  );
}
