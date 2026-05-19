import { createAllianceHppOrder, getAllianceEnvStatus } from "@/lib/alliance-pay";
import { getOrder, serializeOrder, updateOrder } from "@/lib/orders";

type AllianceCreatePayload = {
  orderId?: string;
};

function normalizeStatus(status?: string) {
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
    updateOrder(order.id, { status: "FAIL" });

    return Response.json(
      {
        error: "AlliancePay HPP create-order failed.",
        detail: error instanceof Error ? error.message : "Unknown payment error",
      },
      { status: 502 },
    );
  }
}
