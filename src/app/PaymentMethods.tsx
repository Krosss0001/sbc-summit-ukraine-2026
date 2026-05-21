import { paymentSecurityText } from "./payment-copy";

const paymentMethods = [
  { label: "Visa", mark: "VISA" },
  { label: "Mastercard", mark: "Mastercard" },
  { label: "Apple Pay", mark: "Apple Pay" },
  { label: "Google Pay", mark: "Google Pay" },
  { label: "AlliancePay Secure Checkout", mark: "AlliancePay Secure Checkout" },
] as const;

export function PaymentMethods({ className = "" }: { className?: string }) {
  return (
    <section className={`payment-methods-card ${className}`} aria-label="Платіжні методи">
      <div className="payment-methods-copy">
        <strong>Захищена онлайн-оплата</strong>
        <p>{paymentSecurityText}</p>
      </div>
      <div className="payment-logo-grid" aria-label="Підтримувані платіжні системи">
        {paymentMethods.map((method) => (
          <div className="payment-logo-card" key={method.label} aria-label={method.label} role="img">
            {method.mark}
          </div>
        ))}
      </div>
      <p className="payment-trust-line">
        Visa <span aria-hidden="true">·</span> Mastercard <span aria-hidden="true">·</span> Apple Pay{" "}
        <span aria-hidden="true">·</span> Google Pay <span aria-hidden="true">·</span> AlliancePay
      </p>
    </section>
  );
}
