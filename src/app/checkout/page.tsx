import Link from "next/link";
import { CheckoutForm } from "./CheckoutForm";
import { paymentSecurityText } from "../compliance";
import { formatUah, tickets } from "@/lib/tickets";

type CheckoutPageProps = {
  searchParams?: Promise<{ ticket?: string }>;
};

export default async function CheckoutPage({ searchParams }: CheckoutPageProps) {
  const params = await searchParams;
  const defaultTicket = params?.ticket ?? "BUSINESS";

  return (
    <main className="form-shell px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl content-center gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
        <section>
          <Link href="/" className="nav-link text-[var(--color-accent)]">
            Назад до події
          </Link>
          <p className="eyebrow mt-10">Secure checkout</p>
          <h1 className="mt-4 text-4xl font-semibold leading-none sm:text-5xl">
            Купити квиток на SBC Summit Ukraine 2026
          </h1>
          <p className="mt-5 max-w-prose text-base leading-8 text-white/68">
            Заповніть контактні дані, оберіть тип квитка та кількість. Онлайн-оплата буде активована після завершення верифікації мерчанта AlliancePay.
          </p>

          <div className="mt-7 grid gap-3">
            {tickets.map((ticket) => (
              <div className="price-row" key={ticket.type}>
                <span>{ticket.type}</span>
                <strong>{formatUah(ticket.priceUah)}</strong>
              </div>
            ))}
          </div>

          <div className="notice mt-7">{paymentSecurityText}</div>
        </section>

        <CheckoutForm defaultTicket={defaultTicket} />
      </div>
    </main>
  );
}
