export interface Review {
  review_id: number;
  property_id: number;
  user_id: number;
  name: string;
  rating: number;
  comment: string;
  reviewed_at: string;
  helpful_votes: number;
}