import { OrderStatusPanel } from "../OrderStatusPanel";
import { alliancePayReviewMessage } from "@/lib/alliance-pay";

type PendingPageProps = {
  searchParams?: Promise<{ order?: string; merchantRequestId?: string; payment?: string }>;
};

export default async function PendingPage({ searchParams }: PendingPageProps) {
  const params = await searchParams;
  const orderId = params?.order ?? params?.merchantRequestId ?? "pending";
  const isAlliancePayReview = params?.payment === "alliancepay-review";

  return (
    <main className="form-shell px-4 py-8 sm:px-6 lg:px-8">
      <section className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-3xl content-center">
        <div className="glass-panel rounded-lg p-6 text-center sm:p-10">
          <p className="eyebrow">Статус заявки</p>
          <h1 className="mt-4 text-4xl font-semibold leading-none sm:text-5xl">
            {isAlliancePayReview ? "Заявку на квиток створено" : "Очікуємо підтвердження"}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-white/70">
            {isAlliancePayReview
              ? "Онлайн-оплата буде активована після завершення верифікації мерчанта AlliancePay."
              : "Статус платежу може бути PENDING або REQUIRED_3DS, доки банк завершує перевірку. Після підтвердження AlliancePay квиток стане доступним автоматично."}
          </p>
          {isAlliancePayReview ? (
            <div className="notice mx-auto mt-7 max-w-xl text-left" role="status">
              {alliancePayReviewMessage}
            </div>
          ) : null}
          <div className="notice mx-auto mt-7 max-w-xl text-left">
            ID замовлення: <span className="font-mono text-[var(--color-accent)]">{orderId}</span>
          </div>
          <div className="mt-8 text-left">
            <OrderStatusPanel orderId={orderId} mode="pending" />
          </div>
        </div>
      </section>
    </main>
  );
}
