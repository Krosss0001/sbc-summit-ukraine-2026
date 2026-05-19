"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { formatUah, type TicketType } from "@/lib/tickets";

type OrderStatus =
  | "CREATED"
  | "MERCHANT_VERIFICATION_PENDING"
  | "PENDING"
  | "REQUIRED_3DS"
  | "SUCCESS"
  | "FAIL";

type PublicOrder = {
  orderId: string;
  status: OrderStatus;
  ticketType: TicketType;
  quantity: number;
  amount: number;
  coinAmount: number;
  customer?: {
    name: string;
    email: string;
  };
};

export function OrderStatusPanel({ orderId, mode }: { orderId: string; mode: "pending" | "ticket" }) {
  const [order, setOrder] = useState<PublicOrder | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadStatus() {
      try {
        const response = await fetch(`/api/orders/status?order=${encodeURIComponent(orderId)}`, {
          cache: "no-store",
        });

        if (!response.ok) throw new Error("status");
        const data = (await response.json()) as PublicOrder;
        if (isMounted) {
          setOrder(data);
          setError("");
        }
      } catch {
        if (isMounted) setError("Статус замовлення поки недоступний. Спробуйте оновити сторінку за хвилину.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadStatus();
    const timer = window.setInterval(loadStatus, 8000);

    return () => {
      isMounted = false;
      window.clearInterval(timer);
    };
  }, [orderId]);

  if (isLoading) {
    return (
      <div className="status-skeleton" aria-live="polite">
        <div />
        <div />
        <div />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="notice border-red-300/30 bg-red-500/10 text-red-100" role="alert">
        {error || "Замовлення не знайдено."}
      </div>
    );
  }

  const isPaid = order.status === "SUCCESS";
  const isFailed = order.status === "FAIL";
  const isTicketMode = mode === "ticket";

  return (
    <div className="grid gap-5">
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="metric">
          <span>Статус</span>
          <strong>
            {order.status === "MERCHANT_VERIFICATION_PENDING"
              ? "Очікує активації оплати"
              : order.status}
          </strong>
        </div>
        <div className="metric">
          <span>Квиток</span>
          <strong>{order.ticketType} x{order.quantity}</strong>
        </div>
        <div className="metric">
          <span>Сума</span>
          <strong>{formatUah(order.amount)}</strong>
        </div>
      </div>

      {isTicketMode ? (
        <div className="mt-2 grid place-items-center rounded-lg border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <div className={`qr-placeholder ${isPaid ? "qr-paid" : ""}`}>
            {isPaid ? "QR VALID" : "QR LOCKED"}
          </div>
          <p className="mt-4 max-w-xl text-center text-sm leading-6 text-white/62">
            {isPaid
              ? "Квиток активний після підтвердженого статусу SUCCESS."
              : "QR відкриється тільки після реального серверного підтвердження SUCCESS від AlliancePay."}
          </p>
        </div>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row">
        {isPaid ? (
          <Link className="button-primary min-h-12 px-7" href={`/ticket?order=${encodeURIComponent(order.orderId)}`}>
            Відкрити квиток
          </Link>
        ) : null}
        {isFailed ? (
          <Link className="button-primary min-h-12 px-7" href="/checkout">
            Спробувати ще раз
          </Link>
        ) : null}
        {!isPaid && !isFailed ? (
          <Link className="button-secondary min-h-12 px-7" href={`/pending?order=${encodeURIComponent(order.orderId)}`}>
            Оновити статус
          </Link>
        ) : null}
        <Link className="button-secondary min-h-12 px-7" href="/">
          На головну
        </Link>
      </div>
    </div>
  );
}
