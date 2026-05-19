import Link from "next/link";
import { formatUah, tickets } from "@/lib/tickets";

export default function TermsPage() {
  return (
    <main className="form-shell min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <section className="legal-page mx-auto max-w-3xl">
        <Link href="/" className="nav-link text-[var(--color-accent)]">
          Назад до події
        </Link>
        <div className="glass-panel mt-8 rounded-lg p-6 sm:p-10">
          <p className="eyebrow">Публічна оферта</p>
          <h1>Умови участі у SBC Summit Ukraine 2026</h1>
          <div className="legal-copy">
            <p>
              Ці умови регулюють оформлення заявки та купівлю квитків на SBC
              Summit Ukraine 2026, що відбудеться 27 травня 2026 року у КВЦ
              Парковий, м. Київ, Паркова дорога, 16А.
            </p>
            <p>
              Доступні типи квитків: {tickets.map((ticket) => `${ticket.type} - ${formatUah(ticket.priceUah)}`).join(", ")}.
              Кількість квитків в одній заявці може бути обмежена організатором.
            </p>
            <p>
              Онлайн-оплата буде доступна через захищену платіжну сторінку
              AlliancePay HPP після завершення верифікації мерчанта. Дані
              платіжної картки не вводяться та не зберігаються на цьому сайті.
            </p>
            <p>
              QR-квиток видається та активується тільки після підтвердженого
              серверного статусу платежу SUCCESS. До такого підтвердження QR
              залишається заблокованим.
            </p>
            <p>
              Учасник відповідає за правильність і актуальність імені, телефону,
              email та інших контактних даних, наданих під час оформлення заявки.
            </p>
            <p>
              Організатор може оновлювати програму, розклад, склад спікерів,
              партнерів або окремі елементи події, якщо це потрібно для належного
              проведення заходу.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
