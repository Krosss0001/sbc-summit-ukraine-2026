import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="form-shell min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <section className="legal-page mx-auto max-w-3xl">
        <Link href="/" className="nav-link text-[var(--color-accent)]">
          Назад до події
        </Link>
        <div className="glass-panel mt-8 rounded-lg p-6 sm:p-10">
          <p className="eyebrow">Політика конфіденційності</p>
          <h1>Обробка персональних даних</h1>
          <div className="legal-copy">
            <p>
              Сайт збирає дані, які користувач самостійно надає у формі заявки:
              ім&apos;я та прізвище, телефон, email, Telegram, тип квитка та
              кількість квитків.
            </p>
            <p>
              Дані використовуються для створення заявки на квиток, обробки
              замовлення, комунікації щодо події, перевірки статусу оплати та
              надання доступу до квитка після підтвердження платежу.
            </p>
            <p>
              Дані платіжної картки не збираються та не зберігаються цим сайтом.
              Після активації мерчанта карткові дані оброблятимуться на
              захищеній платіжній сторінці AlliancePay.
            </p>
            <p>
              Із запитами щодо персональних даних звертайтеся до організатора:
              citointruesgmail.com або Telegram bogdan_chekan.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
