"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import useAdminReviewsStore from "@/store/admin/AdminReviewsStore";
import PresentationalReviews from "./PresentationalReviews";
import { useRouter } from "next/navigation";

export default function ContainerReviews() {
  const {
    reviews,
    handleGetReviews,
    totalReviews,
    totalLikesCount,
    hasMore,
    isLoading,
    loadMoreReviews,
    handleDeleteReview,
    currentPage,
    loadingIds,
  } = useAdminReviewsStore();
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  // Load reviews
  useEffect(() => {
    handleGetReviews(1);
  }, [handleGetReviews]);

  // Delete Review
  const submitDelete = async (id: number, propertyId: number) => {
    await handleDeleteReview(id, currentPage, propertyId);
    await handleGetReviews(currentPage);
    router.refresh();
  };

  // Filtered Reviews
  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.user_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.property_title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  // Review Rating
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        fill={i < rating ? "#f59e0b" : "none"}
        color={i < rating ? "#f59e0b" : "#e5e7eb"}
      />
    ));
  };

  return (
    <PresentationalReviews
      totalReviews={totalReviews}
      totalLikesCount={totalLikesCount}
      hasMore={hasMore}
      isLoading={isLoading}
      loadMoreReviews={loadMoreReviews}
      loadingIds={loadingIds}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      renderStars={renderStars}
      filteredReviews={filteredReviews}
      submitDelete={submitDelete}
    />
  );
}
