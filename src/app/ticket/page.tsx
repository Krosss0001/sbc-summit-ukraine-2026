import Link from "next/link";
import { OrderStatusPanel } from "../OrderStatusPanel";
import { PaymentSecurityBlock } from "../compliance";

type TicketPageProps = {
  searchParams?: Promise<{ order?: string; merchantRequestId?: string }>;
};

export default async function TicketPage({ searchParams }: TicketPageProps) {
  const params = await searchParams;
  const orderId = params?.order ?? params?.merchantRequestId ?? "";

  return (
    <main className="form-shell px-4 py-8 sm:px-6 lg:px-8">
      <section className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-4xl content-center gap-6">
        <Link href="/" className="nav-link w-fit text-[var(--color-accent)]">
          SBC Summit Ukraine 2026
        </Link>
        <div className="glass-panel relative overflow-hidden rounded-lg p-6 sm:p-10">
          <div className="absolute right-6 top-6 hidden h-24 w-24 rounded-full border border-[var(--color-accent)]/40 sm:block" />
          <p className="eyebrow">Digital ticket</p>
          <h1 className="mt-4 max-w-2xl text-4xl font-semibold leading-none sm:text-6xl">
            КВЦ Парковий · 27 травня 2026
          </h1>
          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            <div className="metric">
              <span>Order</span>
              <strong className="break-all font-mono text-base">{orderId}</strong>
            </div>
            <div className="metric">
              <span>Time</span>
              <strong>09:30 - 23:00</strong>
            </div>
            <div className="metric">
              <span>Status</span>
              <strong>За даними сервера</strong>
            </div>
          </div>
          <div className="mt-8">
            <OrderStatusPanel orderId={orderId} mode="ticket" />
          </div>
          <div className="mt-8">
            <PaymentSecurityBlock />
          </div>
        </div>
      </section>
    </main>
  );
}
