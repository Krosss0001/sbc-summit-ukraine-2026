"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type MockStatus = "SUCCESS" | "PENDING" | "REQUIRED_3DS" | "FAIL";

export function MockPaymentActions({ orderId }: { orderId: string }) {
  const router = useRouter();
  const [pendingStatus, setPendingStatus] = useState<MockStatus | null>(null);
  const [error, setError] = useState("");

  async function applyStatus(status: MockStatus) {
    setPendingStatus(status);
    setError("");

    try {
      const orderResponse = await fetch(`/api/orders/status?order=${encodeURIComponent(orderId)}`, {
        cache: "no-store",
      });
      const order = orderResponse.ok
        ? ((await orderResponse.json()) as { coinAmount?: number; merchantRequestId?: string })
        : null;

      const response = await fetch("/api/payments/alliance/webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          merchantRequestId: order?.merchantRequestId ?? orderId,
          merchantId: "local-review-merchant",
          hppOrderId: `mock-hpp-${orderId}`,
          ecomOrderId: `mock-ecom-${orderId}`,
          coinAmount: order?.coinAmount ?? 0,
          orderStatus: status,
          paymentMethods: ["CARD", "APPLE_PAY", "GOOGLE_PAY"],
        }),
      });

      if (!response.ok) {
        throw new Error("mock-webhook");
      }

      if (status === "SUCCESS") router.push(`/success?order=${encodeURIComponent(orderId)}`);
      else if (status === "FAIL") router.push(`/fail?order=${encodeURIComponent(orderId)}`);
      else router.push(`/pending?order=${encodeURIComponent(orderId)}`);
    } catch {
      setError("Не вдалося оновити статус. Спробуйте ще раз.");
      setPendingStatus(null);
    }
  }

  return (
    <div className="mt-8 grid gap-3 sm:grid-cols-3">
      {!orderId ? (
        <p className="field-error sm:col-span-3">ID замовлення відсутній. Поверніться до checkout і створіть нове замовлення.</p>
      ) : null}
      {error ? <p className="field-error sm:col-span-3">{error}</p> : null}
      <button
        type="button"
        className="button-primary min-h-12 px-7"
        disabled={Boolean(pendingStatus) || !orderId}
        onClick={() => applyStatus("SUCCESS")}
      >
        {pendingStatus === "SUCCESS" ? "Оновлення..." : "Позначити SUCCESS"}
      </button>
      <button
        type="button"
        className="button-secondary min-h-12 px-7"
        disabled={Boolean(pendingStatus) || !orderId}
        onClick={() => applyStatus("PENDING")}
      >
        {pendingStatus === "PENDING" ? "Оновлення..." : "Залишити PENDING"}
      </button>
      <button
        type="button"
        className="button-secondary min-h-12 px-7"
        disabled={Boolean(pendingStatus) || !orderId}
        onClick={() => applyStatus("FAIL")}
      >
        {pendingStatus === "FAIL" ? "Оновлення..." : "Позначити FAIL"}
      </button>
    </div>
  );
}
