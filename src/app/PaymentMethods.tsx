import Image from "next/image";
import { paymentSecurityText } from "./payment-copy";

const paymentMethods = [
  {
    label: "Visa",
    src: "/payment/Visa_Inc._logo_(19921999).svg.png",
  },
  {
    label: "Mastercard",
    src: "/payment/MasterCard_Logo.svg.png",
  },
  {
    label: "Apple Pay",
    src: "/payment/Apple_Pay_logo.svg.png",
  },
  {
    label: "Google Pay",
    src: "/payment/Google_Pay_Logo.svg.png",
  },
  {
    label: "AlliancePay Secure Checkout",
    src: "/payment/alliancepay_512x256.png",
  },
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
            <Image
              src={method.src}
              alt={method.label}
              width={180}
              height={72}
              className="payment-logo-image"
              sizes="(min-width: 900px) 160px, (min-width: 640px) 30vw, 45vw"
            />
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
