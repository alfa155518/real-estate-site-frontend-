import useProfileStore from "@/store/ProfileStore";
import useReviewStore from "@/store/ReviewStore";

export const useReviewsCard = (propertyId: number) => {
  const { token } = useProfileStore();
  const { handleReviewLike, isLoading } = useReviewStore();

  const handleLike = async (reviewId: number) => {
    if (token) {
      await handleReviewLike(reviewId, token, propertyId);
    }
  };

  return { handleLike, isLoading };
};
