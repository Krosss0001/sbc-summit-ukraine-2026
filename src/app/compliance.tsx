import Link from "next/link";
import { PaymentMethods } from "./PaymentMethods";
import { paymentSecurityText } from "./payment-copy";

export const organizer = {
  brand: "RAVE'ERA GROUP",
  legalName: "ФОП Чекан Богдан Орестович",
  taxId: "3411613291",
  kved: "90.01 Театральна та концертна діяльність",
  address: "Україна, 03022, м. Київ, вул. Здановської Юлії, буд. 49, корп. 10, кв. 306",
  email: "citointruesgmail.com",
  phone: "+38 (093) 430-75-51",
  telegram: "bogdan_chekan",
  supportHours: "Пн-Пт 10:00-19:00",
} as const;

export { paymentSecurityText };

export const merchantReviewMessage =
  "Заявку створено. Онлайн-оплата буде активована після завершення верифікації мерчанта AlliancePay.";

export function PaymentSecurityBlock({ className = "" }: { className?: string }) {
  return <PaymentMethods className={className} />;
}

export function OrganizerDetails({ compact = false }: { compact?: boolean }) {
  return (
    <div className="legal-list">
      <div>
        <span>Організатор</span>
        <strong>{organizer.brand}</strong>
      </div>
      <div>
        <span>Юридична особа</span>
        <strong>{organizer.legalName}</strong>
      </div>
      <div>
        <span>ІПН / РНОКПП</span>
        <strong>{organizer.taxId}</strong>
      </div>
      <div>
        <span>КВЕД</span>
        <strong>{organizer.kved}</strong>
      </div>
      <div>
        <span>Адреса</span>
        <strong>{organizer.address}</strong>
      </div>
      <div>
        <span>Email</span>
        <strong>{organizer.email}</strong>
      </div>
      <div>
        <span>Телефон</span>
        <strong>{organizer.phone}</strong>
      </div>
      <div>
        <span>Telegram</span>
        <strong>{organizer.telegram}</strong>
      </div>
      {!compact ? (
        <div>
          <span>Години підтримки</span>
          <strong>{organizer.supportHours}</strong>
        </div>
      ) : null}
      <div>
        <span>IBAN</span>
        {/* TODO: Replace after bank account details are confirmed. */}
        <strong>IBAN: буде додано після підтвердження банківських реквізитів</strong>
      </div>
    </div>
  );
}

export function LegalBackLink() {
  return (
    <Link href="/" className="nav-link text-[var(--color-accent)]">
      Назад до події
    </Link>
  );
}
