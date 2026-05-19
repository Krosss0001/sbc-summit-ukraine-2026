import Link from "next/link";
import { OrderStatusPanel } from "../OrderStatusPanel";

type FailPageProps = {
  searchParams?: Promise<{ order?: string; merchantRequestId?: string }>;
};

export default async function FailPage({ searchParams }: FailPageProps) {
  const params = await searchParams;
  const orderId = params?.order ?? params?.merchantRequestId;

  return (
    <main className="form-shell px-4 py-8 sm:px-6 lg:px-8">
      <section className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-3xl content-center">
        <div className="glass-panel rounded-lg p-6 text-center sm:p-10">
          <p className="eyebrow">Payment failed</p>
          <h1 className="mt-4 text-4xl font-semibold leading-none sm:text-5xl">Оплата не пройшла</h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-white/70">
            Платіж було відхилено або скасовано. Ви можете повернутися до checkout і створити нову спробу оплати.
          </p>
          {orderId ? (
            <div className="mt-8 text-left">
              <OrderStatusPanel orderId={orderId} mode="pending" />
            </div>
          ) : null}
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link className="button-primary min-h-12 px-7" href="/checkout">
              Спробувати ще раз
            </Link>
            <Link className="button-secondary min-h-12 px-7" href="/">
              На головну
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
