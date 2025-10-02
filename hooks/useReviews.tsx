import useReviewStore from "@/store/ReviewStore";
import { ReviewFormData } from "@/types/reviews";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";

export default function useReviews(propertyId?: number) {
  // Use ReviewStore for reviews
  const {
    reviewsByProperty,
    isLoading: isLoadingReviews,
    handleGetReviewsByProperty,
    handlePostReview,
  } = useReviewStore();

  // Use React Hook Form for form management
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReviewFormData>({
    defaultValues: {
      rating: 0,
      comment: "",
    },
  });

  // Watch the rating value to update the UI
  const ratingValue = watch("rating", 0);

  // Calculate average rating
  const averageRating = useMemo(() => {
    const validReviews = reviewsByProperty.filter(
      (review) => review && review.rating !== undefined
    );
    return validReviews.length > 0
      ? validReviews.reduce((acc, review) => acc + (review.rating || 0), 0) /
          validReviews.length
      : 0;
  }, [reviewsByProperty]);

  // Load reviews when propertyId changes
  useEffect(() => {
    if (propertyId) {
      handleGetReviewsByProperty(propertyId);
    }
  }, [propertyId, handleGetReviewsByProperty]);

  // Handle review submission
  const handleReviewSubmit = async (formData: ReviewFormData) => {
    const response = await handlePostReview(formData, propertyId || 0);
    if (response?.status === "success") {
      reset();
    }
  };

  return {
    reviewsByProperty,
    isLoadingReviews,
    averageRating,
    ratingValue,
    errors,
    isSubmitting,
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    handleReviewSubmit,
  };
}
