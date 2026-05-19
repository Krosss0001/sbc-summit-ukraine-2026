import { MockPaymentActions } from "./MockPaymentActions";

type MockPaymentPageProps = {
  searchParams?: Promise<{ order?: string }>;
};

export default async function MockPaymentPage({ searchParams }: MockPaymentPageProps) {
  const params = await searchParams;
  const orderId = params?.order ?? "";

  return (
    <main className="form-shell px-4 py-8 sm:px-6 lg:px-8">
      <section className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-3xl content-center">
        <div className="glass-panel rounded-lg p-6 sm:p-9">
          <p className="eyebrow">AlliancePay HPP</p>
          <h1 className="mt-4 text-4xl font-semibold leading-none sm:text-5xl">Сервісна сторінка платежу</h1>
          <p className="mt-5 text-base leading-8 text-white/70">
            Оплата проходить через захищену платіжну сторінку AlliancePay. Дані платіжної картки не зберігаються на сайті.
          </p>
          <div className="notice mt-6">
            ID замовлення: <span className="font-mono text-[var(--color-accent)]">{orderId}</span>
          </div>
          <MockPaymentActions orderId={orderId} />
        </div>
      </section>
    </main>
  );
}
