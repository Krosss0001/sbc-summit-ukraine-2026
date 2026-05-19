import { createAllianceHppOrder, getAllianceEnvStatus } from "@/lib/alliance-pay";
import { getOrder, serializeOrder, updateOrder } from "@/lib/orders";

type AllianceCreatePayload = {
  orderId?: string;
};

function normalizeStatus(status?: string) {
  if (status === "MERCHANT_VERIFICATION_PENDING") return status;
  if (status === "SUCCESS" || status === "FAIL" || status === "REQUIRED_3DS") return status;
  return "PENDING";
}

export async function POST(request: Request) {
  let payload: AllianceCreatePayload;

  try {
    payload = (await request.json()) as AllianceCreatePayload;
  } catch {
    return Response.json({ error: "Invalid JSON payment payload." }, { status: 400 });
  }

  const order = getOrder(payload.orderId);

  if (!order) {
    return Response.json({ error: "Order not found." }, { status: 404 });
  }

  try {
    const hpp = await createAllianceHppOrder(order);
    const updatedOrder = updateOrder(order.id, {
      hppOrderId: hpp.hppOrderId,
      ecomOrderId: hpp.ecomOrderId,
      redirectUrl: hpp.redirectUrl,
      statusUrl: hpp.statusUrl ?? undefined,
      status: normalizeStatus(hpp.orderStatus),
    });

    return Response.json({
      provider: "AlliancePay",
      envReady: getAllianceEnvStatus().ready,
      redirectUrl: hpp.redirectUrl,
      reviewMode: hpp.reviewMode ?? false,
      message: hpp.message,
      order: updatedOrder ? serializeOrder(updatedOrder) : serializeOrder(order),
    });
  } catch (error) {
    updateOrder(order.id, {
      status: "MERCHANT_VERIFICATION_PENDING",
      redirectUrl: `/pending?order=${encodeURIComponent(order.id)}&payment=alliancepay-review`,
      statusUrl: `/pending?order=${encodeURIComponent(order.id)}`,
    });

    return Response.json(
      {
        error:
          "Заявку на квиток створено. Онлайн-оплата буде активована після завершення верифікації мерчанта AlliancePay.",
        detail: error instanceof Error ? error.message : "Unknown payment error",
        redirectUrl: `/pending?order=${encodeURIComponent(order.id)}&payment=alliancepay-review`,
      },
      { status: 202 },
    );
  }
}
