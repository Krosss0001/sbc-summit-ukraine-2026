import { findOrderByAnyId, updateOrder } from "@/lib/orders";

type AllianceWebhookPayload = {
  ecomOrderId?: string;
  coinAmount?: number;
  merchantId?: string;
  statusUrl?: string;
  hppOrderId?: string;
  redirectUrl?: string;
  notificationUrl?: string;
  notificationEncryption?: boolean;
  hppPayType?: string;
  hppDirectType?: string;
  directType?: string;
  merchantRequestId?: string;
  orderStatus?: string;
  paymentMethods?: string[];
};

const validStatuses = ["SUCCESS", "FAIL", "PENDING", "REQUIRED_3DS"] as const;

function isValidWebhook(payload: AllianceWebhookPayload) {
  return (
    typeof payload.merchantRequestId === "string" &&
    payload.merchantRequestId.length > 0 &&
    typeof payload.merchantId === "string" &&
    payload.merchantId.length > 0 &&
    typeof payload.hppOrderId === "string" &&
    payload.hppOrderId.length > 0 &&
    typeof payload.coinAmount === "number" &&
    validStatuses.includes(payload.orderStatus as (typeof validStatuses)[number])
  );
}

export async function POST(request: Request) {
  let payload: AllianceWebhookPayload;

  try {
    payload = (await request.json()) as AllianceWebhookPayload;
  } catch {
    return Response.json({ error: "Invalid JSON callback payload." }, { status: 400 });
  }

  if (!isValidWebhook(payload)) {
    return Response.json({ error: "Invalid AlliancePay callback payload." }, { status: 400 });
  }

  if (
    process.env.ALLIANCE_MERCHANT_ID &&
    payload.merchantId !== process.env.ALLIANCE_MERCHANT_ID
  ) {
    return Response.json({ error: "Invalid AlliancePay merchantId." }, { status: 403 });
  }

  const order = findOrderByAnyId(payload.merchantRequestId);

  if (!order) {
    return Response.json({ received: true, stored: false, reason: "Order not found." }, { status: 202 });
  }

  if (order.merchantRequestId !== payload.merchantRequestId) {
    return Response.json({ error: "Callback merchantRequestId mismatch." }, { status: 409 });
  }

  if (order.hppOrderId && order.hppOrderId !== payload.hppOrderId) {
    return Response.json({ error: "Callback hppOrderId mismatch." }, { status: 409 });
  }

  if (order.coinAmount !== payload.coinAmount) {
    updateOrder(order.id, { status: "FAIL" });
    return Response.json({ error: "Callback amount mismatch." }, { status: 409 });
  }

  const updatedOrder = updateOrder(order.id, {
    hppOrderId: payload.hppOrderId,
    ecomOrderId: payload.ecomOrderId,
    status: payload.orderStatus as "SUCCESS" | "FAIL" | "PENDING" | "REQUIRED_3DS",
    redirectUrl: payload.redirectUrl,
    statusUrl: payload.statusUrl,
  });

  return Response.json({
    received: true,
    stored: true,
    orderId: updatedOrder?.id ?? order.id,
    status: updatedOrder?.status ?? order.status,
  });
}
