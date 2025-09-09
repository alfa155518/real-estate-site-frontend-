import { Suspense } from 'react';
import SearchResults from './SearchResults';

export default function SearchPage() {
  return (
    <Suspense fallback={<div>جاري التحميل...</div>}>
      <SearchResults />
    </Suspense>
  );
}