import { api } from "@/constants/apiPath";
import { instance } from "@/lib/axios";
import type { OrderRequestData } from "@/types/order";

export interface OrderItemResponse {
  bookId: number;
  title: string;
  contents: string;
  thumbnail: string | null;
  price: number;
  salePrice: number | null;
  orderQuantity: number;

  orderStatus: string; //배송상태
  expectedArrivalDate: string; // 배송 도착 예정일
  deliveryDate: string; // 배송완료 실제 도착일
}

export interface OrderResponse {
  orderId: number; // 주문 아이디
  orderDate: string; // 주문일
  orderStatus: string; // 배송 상태
  expectedArrivalDate: string | null; // 예정일
  deliveryDate: string | null; // 배송 도착일
  isRefunded: boolean; // 환불 여부
  isReview: boolean; // 리뷰 가능 여부
  totalPrice: number; // 총 주문 가격
  totalQuantity: number; // 총 주문 수량
  orderItems: OrderItemResponse[];
}

export interface OrderListResponse {
  page: number;
  size: number;
  totalPages: number;
  totalCount: number;
  orders: OrderResponse[];
}

export const getOrderItemList = async (page: number, size = 4) => {
  try {
    const response = await instance.get<OrderListResponse>(
      `${api.orders.orderList}/order-list?page=${page}&size=${size}`
    );
    return response.data;
  } catch (error) {
    console.error("구매 목록 조회 실패 :", error);
    throw error;
  }
};

export const postOrder = async (reqData: OrderRequestData) => {
  try {
    const response = await instance.post(
      `${api.orders.orderList}/order-list`,
      reqData
    );

    if (response.status !== 201) {
      throw new Error("주문 요청 실패");
    }

    return response.data;
  } catch (error) {
    console.error("주문 요청 실패 :", error);
    throw error;
  }
};
