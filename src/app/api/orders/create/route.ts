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

type FieldErrors = Partial<Record<"name" | "phone" | "email" | "ticketType" | "quantity", string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function phoneDigitCount(phone: string) {
  return phone.replace(/\D/g, "").length;
}

function validatePayload(payload: OrderPayload) {
  const fieldErrors: FieldErrors = {};
  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const phone = typeof payload.phone === "string" ? payload.phone.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";

  if (name.length < 2 || name.split(/\s+/).length < 2) {
    fieldErrors.name = "Вкажіть ім'я та прізвище.";
  }
  if (!/^\+?[0-9\s().-]{7,}$/.test(phone) || phoneDigitCount(phone) < 10) {
    fieldErrors.phone = "Вкажіть номер телефону у міжнародному форматі.";
  }
  if (!emailPattern.test(email)) {
    fieldErrors.email = "Вкажіть коректний email.";
  }
  if (typeof payload.ticketType !== "string" || !getTicket(payload.ticketType)) {
    fieldErrors.ticketType = "Оберіть тип квитка.";
  }
  if (!Number.isInteger(payload.quantity) || Number(payload.quantity) <= 0 || Number(payload.quantity) > 20) {
    fieldErrors.quantity = "Кількість має бути цілим числом від 1 до 20.";
  }

  return {
    valid: Object.keys(fieldErrors).length === 0,
    fieldErrors,
  };
}

export async function POST(request: Request) {
  let payload: OrderPayload;

  try {
    payload = (await request.json()) as OrderPayload;
  } catch {
    return Response.json({ error: "Invalid JSON order payload." }, { status: 400 });
  }

  const validation = validatePayload(payload);

  if (!validation.valid) {
    return Response.json(
      {
        error: "Перевірте контактні дані та параметри квитка.",
        fieldErrors: validation.fieldErrors,
      },
      { status: 400 },
    );
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
