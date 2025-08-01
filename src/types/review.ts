import type { OneUser } from "./user";

export interface Review {
  reviewId: number;
  user: OneUser;
  updatedAt: string;
  rating: number;
  content: string;
  deleted: boolean;
}

export enum ReviewFilter {
  Latest = "latest",
  MyReview = "myReview",
}

export interface ReviewCreateReqProps {
  bookId: number;
  reviewReq: ReviewCreateReq;
}

export interface ReviewUpdateReqProps {
  reviewId: number;
  reviewReq: ReviewCreateReq;
}

export interface ReviewCreateReq {
  rating: number;
  content: string;
}
