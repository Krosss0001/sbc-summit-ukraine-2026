import { OrderStatusPanel } from "../OrderStatusPanel";

type SuccessPageProps = {
  searchParams?: Promise<{ order?: string; merchantRequestId?: string }>;
};

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const params = await searchParams;
  const orderId = params?.order ?? params?.merchantRequestId ?? "pending-confirmation";

  return (
    <main className="form-shell px-4 py-8 sm:px-6 lg:px-8">
      <section className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-3xl content-center">
        <div className="glass-panel rounded-lg p-6 text-center sm:p-10">
          <p className="eyebrow">Payment status</p>
          <h1 className="mt-4 text-4xl font-semibold leading-none sm:text-5xl">Перевірка оплати</h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-white/70">
            Квиток активується тільки після підтвердженого статусу SUCCESS у серверному замовленні. Якщо callback від AlliancePay ще обробляється, статус оновиться автоматично.
          </p>
          <div className="mt-8 text-left">
            <OrderStatusPanel orderId={orderId} mode="pending" />
          </div>
        </div>
      </section>
    </main>
  );
}
