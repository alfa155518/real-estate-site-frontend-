import { toast } from "react-hot-toast";
import { create } from "zustand";
import { GetReviewsResponse } from "@/types/reviews";
import { AdminReviewStore } from "@/types/admin/adminReviews";
import { deleteReview, getReviews } from "@/action/admin/AdminReviews";

const useAdminReviewsStore = create<AdminReviewStore>((set, get) => ({
  reviews: [],
  isLoading: false,
  currentPage: 1,
  hasMore: false,
  totalReviews: 0,
  totalLikesCount: 0,
  loadingIds: [],

  // Get Reviews
  handleGetReviews: async (page = 1) => {
    try {
      set({ isLoading: true });
      const response: GetReviewsResponse = await getReviews(page);
      if (response.status === "error") {
        toast.error(response.message);
        return;
      }
      set((state) => ({
        reviews:
          page === 1
            ? response.reviews
            : [...state.reviews, ...response.reviews],
        currentPage: page,
        hasMore: response.has_more,
        totalReviews: response.total_reviews,
        totalLikesCount: response.total_likes_count,
      }));
    } catch {
      toast.error("حدث خطأ ما");
    } finally {
      set({ isLoading: false });
    }
  },

  // handle load more
  loadMoreReviews: async () => {
    const state = get();
    set({ isLoading: true });
    try {
      if (state.hasMore && !state.isLoading) {
        await state.handleGetReviews(state.currentPage + 1);
      }
    } catch {
      toast.error("حدث خطأ ما");
    } finally {
      set({ isLoading: false });
    }
  },

  // Delete Review
  handleDeleteReview: async (
    reviewId: number,
    page: number,
    propertyId: number
  ) => {
    try {
      // Add the review ID to loadingIds when starting deletion
      set((state) => ({
        loadingIds: [...state.loadingIds, reviewId],
      }));
      const response = await deleteReview(reviewId, page, propertyId);
      if (response.status === "success") {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch {
      toast.error("حدث خطأ ما");
    } finally {
      // Remove the review ID from loadingIds when done
      set((state) => ({
        loadingIds: state.loadingIds.filter((id) => id !== reviewId),
      }));
    }
  },
}));

export default useAdminReviewsStore;
