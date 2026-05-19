import { getAllianceHppOrder, normalizeAllianceOrderStatus } from "@/lib/alliance-pay";
import { getOrder, isTerminalOrderStatus, serializePublicOrder, updateOrder } from "@/lib/orders";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("orderId") ?? searchParams.get("order");

  let order = getOrder(id);

  if (!order) {
    return Response.json({ error: "Order not found." }, { status: 404 });
  }

  if (order.hppOrderId && !isTerminalOrderStatus(order.status)) {
    try {
      const allianceOrder = await getAllianceHppOrder(order);

      if (allianceOrder?.orderStatus) {
        order =
          updateOrder(order.id, {
            ecomOrderId: allianceOrder.ecomOrderId,
            redirectUrl: allianceOrder.redirectUrl,
            statusUrl: allianceOrder.statusUrl ?? undefined,
            status: normalizeAllianceOrderStatus(allianceOrder.orderStatus),
          }) ?? order;
      }
    } catch {
      // Keep returning the local status if AlliancePay status polling is unavailable.
    }
  }

  return Response.json(serializePublicOrder(order), {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
