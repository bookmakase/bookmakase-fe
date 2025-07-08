"use client";

import { useEffect } from "react";
import { useOrderStore } from "@/store/useOrderStore";

interface CustomerInfoProps {
  username: string;
  phone: string;
  address: string;
}

export default function CustomerInfo({
  username,
  phone,
  address,
}: CustomerInfoProps) {
  const { setOrderAddress } = useOrderStore();

  useEffect(() => {
    setOrderAddress(address);
  }, [address, setOrderAddress]);

  return (
    <section>
      <h2 className="font-bold text-lg mb-3">주문자 정보</h2>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">주문자</span>
          <span className="font-medium">{username}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">연락처</span>
          <span className="font-medium">{phone}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">배송지</span>
          <span className="font-medium">{address}</span>
        </div>
      </div>
    </section>
  );
}
