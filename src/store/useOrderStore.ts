import { create } from "zustand";
import type { OrderItemType, OrderRequestData } from "@/types/order";

// 1. Zustand 스토어의 상태(state)에 대한 타입 정의
export interface OrderStoreState {
  totalPrice: number;
  totalQuantity: number;
  paymentMethod: "GENERAL";
  orderAddress: string;
  usedPoint: number;
  earningPoint: number;
  deliveryPrice: number;
  orderItems: OrderItemType[];
}

// 2. Zustand 스토어의 액션(actions)에 대한 타입 정의
export interface OrderStoreActions {
  // setOrderItems: (items: OrderItemType[]) => void;
  addOrderItem: (item: OrderItemType) => void;
  updateOrderItemQuantity: (bookId: number, newQuantity: number) => void;
  calculateOrderSummary: () => void;
  setPaymentMethod: (method: "GENERAL") => void;
  setOrderAddress: (address: string) => void;
  setUsedPoint: (point: number) => void;
  getPreparedOrderDataForBE: () => OrderRequestData;
  resetOrderStore: () => void;
}

// 3. 모든 상태와 액션을 포함하는 최종 스토어 타입 정의
export type OrderStore = OrderStoreState & OrderStoreActions;

// 4. Zustand 스토어 생성
export const useOrderStore = create<OrderStore>((set, get) => ({
  // --- 초기 상태 정의 ---
  totalPrice: 0,
  totalQuantity: 0,
  paymentMethod: "GENERAL",
  orderAddress: "",
  usedPoint: 0,
  earningPoint: 0,
  deliveryPrice: 0,
  orderItems: [],
  tempOrderAddressInput: "",
  inputUsedPoint: 0,

  // --- 액션 정의 ---
  /*
  setOrderItems: (items) => {
    set({ orderItems: items });
    // orderItems가 변경될 때 totalPrice와 totalQuantity를 자동으로 재계산
    get().calculateOrderSummary();
  },
  */

  addOrderItem: (item) => {
    set((state) => {
      return { orderItems: [...state.orderItems, item] };
    });
    get().calculateOrderSummary(); // 상품 목록 변경 후 요약 정보 재계산
  },

  updateOrderItemQuantity: (bookId, newQuantity) => {
    set((state) => {
      const updatedItems = state.orderItems.map((item) =>
        item.bookId === bookId ? { ...item, orderQuantity: newQuantity } : item
      );
      return { orderItems: updatedItems };
    });
    // 수량 변경 후 요약 정보 재계산
    get().calculateOrderSummary();
  },

  calculateOrderSummary: () => {
    set((state) => {
      const newTotalPrice = state.orderItems.reduce(
        (acc, item) => acc + item.salePrice * item.orderQuantity,
        0
      );
      const newTotalQuantity = state.orderItems.reduce(
        (acc, item) => acc + item.orderQuantity,
        0
      );
      // 포인트 적립 로직 (예: 총 결제 금액의 1%)
      const newEarningPoint = Math.floor(newTotalPrice * 0.01);

      // 배송비 로직 (예: 5만원 이상 무료배송) - 지금은 무료 배송
      // const newDeliveryPrice = newTotalPrice >= 50000 ? 0 : 3000;
      const newDeliveryPrice = 0;

      return {
        totalPrice: newTotalPrice,
        totalQuantity: newTotalQuantity,
        earningPoint: newEarningPoint,
        deliveryPrice: newDeliveryPrice,
      };
    });
  },

  setPaymentMethod: (method) => set({ paymentMethod: method }),

  setOrderAddress: (address) => set({ orderAddress: address }),

  setUsedPoint: (point) => {
    set({ usedPoint: point });
    // 포인트 사용에 따른 최종 결제 금액 재계산은 getPreparedOrderDataForBE에서 처리
  },

  getPreparedOrderDataForBE: () => {
    const state = get(); // 현재 스토어 상태 가져오기

    // 최종 결제 금액 계산: 상품 금액 - 사용 포인트 + 배송비
    const finalPaymentPrice =
      state.totalPrice - state.usedPoint + state.deliveryPrice;

    return {
      totalPrice: finalPaymentPrice,
      totalQuantity: state.totalQuantity,
      paymentMethod: state.paymentMethod,
      orderAddress: state.orderAddress,
      usedPoint: state.usedPoint,
      earningPoint: state.earningPoint,
      deliveryPrice: state.deliveryPrice,
      orderItems: state.orderItems.map((item) => ({
        bookId: item.bookId,
        title: item.title,
        contents: item.contents,
        salePrice: item.salePrice,
        orderQuantity: item.orderQuantity,
      })),
    };
  },

  resetOrderStore: () => {
    set({
      totalPrice: 0,
      totalQuantity: 0,
      paymentMethod: "GENERAL",
      orderAddress: "",
      usedPoint: 0,
      earningPoint: 0,
      deliveryPrice: 0,
      orderItems: [],
    });
  },
}));
