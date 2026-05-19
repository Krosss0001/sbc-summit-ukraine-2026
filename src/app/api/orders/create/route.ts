import { createPendingOrder, serializeOrder } from "@/lib/orders";
import { getTicket, type TicketType } from "@/lib/tickets";

type OrderPayload = {
  name?: string;
  phone?: string;
  email?: string;
  telegram?: string;
  ticketType?: TicketType;
  quantity?: number;
};

function isValidPayload(payload: OrderPayload) {
  return (
    typeof payload.name === "string" &&
    payload.name.trim().length >= 2 &&
    typeof payload.phone === "string" &&
    /^\+?[0-9\s().-]{7,}$/.test(payload.phone.trim()) &&
    typeof payload.email === "string" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email.trim()) &&
    typeof payload.ticketType === "string" &&
    Boolean(getTicket(payload.ticketType)) &&
    Number.isInteger(payload.quantity) &&
    Number(payload.quantity) > 0 &&
    Number(payload.quantity) <= 20
  );
}

export async function POST(request: Request) {
  let payload: OrderPayload;

  try {
    payload = (await request.json()) as OrderPayload;
  } catch {
    return Response.json({ error: "Invalid JSON order payload." }, { status: 400 });
  }

  if (!isValidPayload(payload)) {
    return Response.json({ error: "Invalid order payload." }, { status: 400 });
  }

  const order = createPendingOrder({
    name: payload.name!,
    phone: payload.phone!,
    email: payload.email!,
    telegram: payload.telegram,
    ticketType: payload.ticketType!,
    quantity: payload.quantity!,
  });

  return Response.json(serializeOrder(order), { status: 201 });
}
