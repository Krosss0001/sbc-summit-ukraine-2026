import Link from "next/link";
import { organizer } from "./compliance";
import { PaymentMethods } from "./PaymentMethods";

const footerLinks = [
  ["Контакти", "/contacts"],
  ["Публічна оферта", "/terms"],
  ["Конфіденційність", "/privacy"],
  ["Повернення", "/refund"],
] as const;

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <section className="footer-panel" aria-label="Подія">
          <div className="brand-mark">
            <span>RAVE&apos;ERA GROUP</span>
            <small>SBC Summit Ukraine 2026</small>
          </div>
          <p>Всеукраїнська конференція зі спортивного маркетингу. КВЦ Парковий, Київ.</p>
        </section>

        <section className="footer-panel" aria-label="Реквізити організатора">
          <span className="footer-label">Організатор</span>
          <strong>{organizer.legalName}</strong>
          <p>{organizer.brand}</p>
          <p>ІПН / РНОКПП: {organizer.taxId}</p>
          <p>КВЕД: {organizer.kved}</p>
          <p>{organizer.address}</p>
          {/* TODO: Replace after bank account details are confirmed. */}
          <p>IBAN: буде додано після підтвердження банківських реквізитів</p>
        </section>

        <section className="footer-panel" aria-label="Контакти">
          <span className="footer-label">Контакти</span>
          <p>Email: {organizer.email}</p>
          <p>Телефон: {organizer.phone}</p>
          <p>Telegram: {organizer.telegram}</p>
          <p>Підтримка: {organizer.supportHours}</p>
        </section>

        <nav className="footer-panel footer-docs" aria-label="Юридичні документи">
          <span className="footer-label">Документи</span>
          {footerLinks.map(([label, href]) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </nav>
      </div>

      <PaymentMethods className="footer-payments" />

      <div className="footer-bottom">
        <span>© 2026 RAVE&apos;ERA GROUP</span>
        <span>AlliancePay HPP · QR після підтвердженого SUCCESS</span>
      </div>
    </footer>
  );
}
