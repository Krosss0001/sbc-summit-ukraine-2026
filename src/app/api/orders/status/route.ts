import { findOrderByAnyId, serializePublicOrder } from "@/lib/orders";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id =
    searchParams.get("orderId") ??
    searchParams.get("order") ??
    searchParams.get("merchantRequestId") ??
    searchParams.get("hppOrderId") ??
    searchParams.get("ecomOrderId");

  const order = findOrderByAnyId(id);

  if (!order) {
    return Response.json({ error: "Order not found." }, { status: 404 });
  }

  return Response.json(serializePublicOrder(order), {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
