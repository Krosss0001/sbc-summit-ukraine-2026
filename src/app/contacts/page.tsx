import {
  LegalBackLink,
  OrganizerDetails,
  PaymentSecurityBlock,
  organizer,
} from "../compliance";

export default function ContactsPage() {
  return (
    <main className="form-shell min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <section className="legal-page mx-auto max-w-4xl">
        <LegalBackLink />
        <div className="glass-panel mt-8 rounded-lg p-6 sm:p-10">
          <p className="eyebrow">Контакти</p>
          <h1>{organizer.brand}</h1>
          <div className="legal-copy">
            <p>
              Організатор події: {organizer.brand}, {organizer.legalName}. Канали відповіді:
              email, телефон і Telegram. Години підтримки: {organizer.supportHours}.
            </p>
            <OrganizerDetails />
            <PaymentSecurityBlock />
          </div>
        </div>
      </section>
    </main>
  );
}
