import "server-only";

import type { LocalOrder } from "./orders";

export type AllianceHppCreateResponse = {
  coinAmount: number;
  merchantId?: string;
  statusUrl?: string | null;
  hppOrderId?: string;
  ecomOrderId?: string;
  redirectUrl: string;
  hppPayType?: "PURCHASE";
  merchantRequestId: string;
  orderStatus?: "SUCCESS" | "FAIL" | "PENDING" | "REQUIRED_3DS" | string;
  paymentMethods?: string[];
  createDate?: string;
  expiredOrderDate?: string;
  reviewMode?: boolean;
  message?: string;
};

const requiredEnv = [
  "ALLIANCE_API_URL",
  "ALLIANCE_MERCHANT_ID",
  "ALLIANCE_AUTH_TOKEN",
  "ALLIANCE_NOTIFICATION_URL",
  "NEXT_PUBLIC_SITE_URL",
] as const;

export function getAllianceEnvStatus() {
  const missing = requiredEnv.filter((key) => !process.env[key]);
  return {
    ready: missing.length === 0,
    missing,
  };
}

export const alliancePayReviewMessage =
  "Заявку на квиток створено. Онлайн-оплата буде активована після завершення верифікації мерчанта AlliancePay. Дані платіжної картки на цьому сайті не збираються та не зберігаються.";

function joinUrl(baseUrl: string, path: string) {
  return `${baseUrl.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}

function customerNames(fullName: string) {
  const [firstName, ...rest] = fullName.trim().split(/\s+/);
  return {
    senderFirstName: firstName || "Customer",
    senderLastName: rest.join(" ") || "Guest",
  };
}

function publicUrl(path: string, order: LocalOrder) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL!.replace(/\/$/, "");
  const url = new URL(path, `${baseUrl}/`);

  url.searchParams.set("order", order.id);
  url.searchParams.set("merchantRequestId", order.merchantRequestId);

  return url.toString();
}

export function buildAllianceHppPayload(order: LocalOrder) {
  const names = customerNames(order.customer.name);

  return {
    merchantId: process.env.ALLIANCE_MERCHANT_ID,
    hppPayType: "PURCHASE",
    directType: "REDIRECT",
    failUrl: publicUrl("/fail", order),
    successUrl: publicUrl("/success", order),
    merchantRequestId: order.merchantRequestId,
    statusPageType: "STATUS_REDIRECT_MERCHANT_PAGE",
    expirationTimeMinutes: 1440,
    paymentMethods: ["CARD", "APPLE_PAY", "GOOGLE_PAY"],
    customerData: {
      senderCustomerId: order.id,
      senderEmail: order.customer.email,
      senderPhone: order.customer.phone.replace(/[^\d+]/g, ""),
      senderCountry: "804",
      ...names,
    },
    coinAmount: order.coinAmount,
    purpose: `SBC Summit Ukraine 2026 ${order.ticketType} ticket x${order.quantity}`,
    language: "uk",
    notificationUrl: process.env.ALLIANCE_NOTIFICATION_URL,
    notificationEncryption: false,
  };
}

export async function createAllianceHppOrder(order: LocalOrder): Promise<AllianceHppCreateResponse> {
  const env = getAllianceEnvStatus();

  if (!env.ready) {
    return {
      coinAmount: order.coinAmount,
      merchantRequestId: order.merchantRequestId,
      orderStatus: "MERCHANT_VERIFICATION_PENDING",
      paymentMethods: ["CARD", "APPLE_PAY", "GOOGLE_PAY"],
      redirectUrl: `/pending?order=${encodeURIComponent(order.id)}&payment=alliancepay-review`,
      statusUrl: `/pending?order=${encodeURIComponent(order.id)}`,
      reviewMode: true,
      message: alliancePayReviewMessage,
    };
  }

  const endpoint = joinUrl(
    process.env.ALLIANCE_API_URL!,
    "/ecom/execute_request/hpp/v1/create-order",
  );

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api_version": "v1",
      Authorization: `Bearer ${process.env.ALLIANCE_AUTH_TOKEN}`,
    },
    body: JSON.stringify(buildAllianceHppPayload(order)),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`AlliancePay create-order failed: ${response.status} ${text}`);
  }

  const data = (await response.json()) as AllianceHppCreateResponse;

  if (!data.redirectUrl || !data.merchantRequestId) {
    throw new Error("AlliancePay create-order response is missing redirectUrl or merchantRequestId");
  }

  if (data.merchantRequestId !== order.merchantRequestId) {
    throw new Error("AlliancePay create-order response merchantRequestId mismatch");
  }

  if (typeof data.coinAmount === "number" && data.coinAmount !== order.coinAmount) {
    throw new Error("AlliancePay create-order response amount mismatch");
  }

  if (data.merchantId && data.merchantId !== process.env.ALLIANCE_MERCHANT_ID) {
    throw new Error("AlliancePay create-order response merchantId mismatch");
  }

  return data;
}
