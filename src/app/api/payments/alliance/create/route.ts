import {
  createAllianceHppOrder,
  getAllianceEnvStatus,
  normalizeAllianceOrderStatus,
} from "@/lib/alliance-pay";
import {
  getOrder,
  isTerminalOrderStatus,
  serializePublicOrder,
  updateOrder,
} from "@/lib/orders";

type AllianceCreatePayload = {
  orderId?: string;
};

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

  if (isTerminalOrderStatus(order.status)) {
    return Response.json(
      {
        error: "Order is already finalized.",
        redirectUrl:
          order.status === "SUCCESS" || order.status === "PARTIAL_REFUND"
            ? `/ticket?order=${encodeURIComponent(order.id)}`
            : `/fail?order=${encodeURIComponent(order.id)}`,
        order: serializePublicOrder(order),
      },
      { status: 409 },
    );
  }

  try {
    const hpp = await createAllianceHppOrder(order);
    const updatedOrder = updateOrder(order.id, {
      hppOrderId: hpp.hppOrderId,
      ecomOrderId: hpp.ecomOrderId,
      redirectUrl: hpp.redirectUrl,
      statusUrl: hpp.statusUrl ?? undefined,
      status:
        hpp.orderStatus === "MERCHANT_VERIFICATION_PENDING"
          ? "MERCHANT_VERIFICATION_PENDING"
          : normalizeAllianceOrderStatus(hpp.orderStatus),
    });

    return Response.json({
      provider: "AlliancePay",
      envReady: getAllianceEnvStatus().ready,
      redirectUrl: hpp.redirectUrl,
      reviewMode: hpp.reviewMode ?? false,
      message: hpp.message,
      order: updatedOrder ? serializePublicOrder(updatedOrder) : serializePublicOrder(order),
    });
  } catch {
    updateOrder(order.id, {
      status: "MERCHANT_VERIFICATION_PENDING",
      redirectUrl: `/pending?order=${encodeURIComponent(order.id)}&payment=alliancepay-review`,
      statusUrl: `/pending?order=${encodeURIComponent(order.id)}`,
    });

    return Response.json(
      {
        error:
          "Заявку на квиток створено. Онлайн-оплата буде активована після завершення верифікації мерчанта AlliancePay.",
        redirectUrl: `/pending?order=${encodeURIComponent(order.id)}&payment=alliancepay-review`,
      },
      { status: 202 },
    );
  }
}
