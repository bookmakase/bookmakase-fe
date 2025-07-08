// 1. 주문 상품 개별 항목에 대한 타입 정의
export interface OrderItemType {
  bookId: number;
  title: string;
  contents: string;
  salePrice: number;
  orderQuantity: number;
}

// 2. 백엔드로 전송될 최종 주문 데이터의 타입 정의
export interface OrderRequestData {
  totalPrice: number;
  totalQuantity: number;
  paymentMethod: "GENERAL";
  orderAddress: string;
  usedPoint: number;
  earningPoint: number;
  deliveryPrice: number;
  orderItems: OrderItemType[];
}
