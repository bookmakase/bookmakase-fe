import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type OrderItemProps = {
  bookId: number;
  quantity: number;
};

interface OrderItemStoreState {
  selectedOrderItems: OrderItemProps[];
  addSelectedItem: (bookId: number, quantity: number) => void;
  clearItems: () => void;
  isOrderFlowActive: boolean;
  setOrderFlowActive: (isActive: boolean) => void;
}

export const useOrderItemStore = create<OrderItemStoreState>()(
  persist(
    (set) => ({
      selectedOrderItems: [],
      addSelectedItem: (bookId, quantity) => {
        set((state) => ({
          selectedOrderItems: [
            ...state.selectedOrderItems,
            { bookId, quantity },
          ],
        }));
      },
      clearItems: () => set({ selectedOrderItems: [] }),
      isOrderFlowActive: false,
      setOrderFlowActive: (isActive: boolean) =>
        set({ isOrderFlowActive: isActive }),
    }),
    {
      name: "order-item-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
