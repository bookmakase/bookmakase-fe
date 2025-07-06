import type { OneUser } from "./user";

export interface Review {
  reviewId: number;
  user: OneUser;
  updatedAt: string;
  rating: number;
  content: string;
}

export enum ReviewFilter {
  Latest = "latest",
  MyReview = "myReview",
}
