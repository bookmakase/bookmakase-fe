"use client";

import { useOrderStore } from "@/store/useOrderStore";

export default function PaymentSelection() {
  const { paymentMethod, setPaymentMethod } = useOrderStore();

  return (
    <section>
      <h2 className="font-bold text-lg mb-3">결제수단</h2>
      <div className="flex items-center gap-3">
        <input
          type="radio"
          id="general"
          name="payment"
          className="accent-main"
          value={"GENERAL"}
          checked={paymentMethod === "GENERAL"}
          onChange={() => setPaymentMethod("GENERAL")}
        />
        <label htmlFor="general" className="text-sm">
          일반결제
        </label>
      </div>
    </section>
  );
}
