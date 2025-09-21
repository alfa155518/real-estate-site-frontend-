import { Suspense } from 'react';
import SearchResults from './SearchResults';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "بحث عقاري | ابحث عن شقة، فيلا، أو عقار تجاري",
  description: "استخدم أدوات البحث المتقدمة والخرائط التفاعلية للعثور على شقة، فيلا، أو مكتب يناسب احتياجاتك بسرعة ودقة.",
  keywords: ["بحث عقاري", "عقارات للبحث", "بحث عن شقة", "بحث عن فيلا", "عقارات تجارية"],
};

export default function SearchPage() {
  return (
    <Suspense fallback={<div>جاري التحميل...</div>}>
      <SearchResults />
    </Suspense>
  );
}