export interface Like {
  id: number;
  user_id: number;
  review_id: number;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: number;
  user_name: string;
  rating: number;
  comment: string;
  created_at: string;
  updated_at: string;
  likes_count: number;
  likes: Like[];
  property_id: number;
  user_id: number;
}

export interface ReviewLikeResponse {
  status: "success" | "error";
  message: string;
  review: Review;
}

export interface GetReviewsResponse extends ReviewLikeResponse {
  reviews: Review[];
  has_more: boolean;
  total_reviews: number;
}

export interface PropertyIdProps {
  propertyId: number;
}
export interface ReviewCardProps {
  review: Review;
  propertyId?: number;
}
export interface ReviewFormData extends PropertyIdProps {
  rating: number;
  comment: string;
}

// Zustand Store State + Actions
export interface ReviewStore {
  reviews: Review[];
  reviewsByProperty: Review[];
  currentPage: number;
  hasMore: boolean;
  totalReviews: number;
  isLoading: boolean;

  handleGetReviews: (page?: number) => Promise<GetReviewsResponse | null>;
  handleGetReviewsByProperty: (
    propertyId: number
  ) => Promise<GetReviewsResponse | null>;
  handlePostReview: (reviewData: ReviewFormData, propertyId: number) => Promise<{ status: string, message: string } | null>;
  loadMoreReviews: () => Promise<GetReviewsResponse | null>;
  handleReviewLike: (
    reviewId: number | string,
    token: string,
    propertyId?: number,
  ) => Promise<ReviewLikeResponse | null>;
}

