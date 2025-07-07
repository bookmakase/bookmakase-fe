export default function PaymentSelection() {
  return (
    <section>
      <h2 className="font-bold text-lg mb-3">결제수단</h2>
      <div className="flex items-center gap-3">
        <input
          type="radio"
          id="normal"
          name="payment"
          className="accent-main"
        />
        <label htmlFor="normal" className="text-sm">
          일반결제
        </label>
      </div>
    </section>
  );
}
