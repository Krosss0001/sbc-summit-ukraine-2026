import { getTicket, type TicketType } from "./tickets";

export type AllianceOrderStatus =
  | "CREATED"
  | "MERCHANT_VERIFICATION_PENDING"
  | "PENDING"
  | "REQUIRED_3DS"
  | "SUCCESS"
  | "FAIL";

export type CustomerData = {
  name: string;
  phone: string;
  email: string;
  telegram?: string;
};

export type LocalOrder = {
  id: string;
  merchantRequestId: string;
  hppOrderId?: string;
  ecomOrderId?: string;
  status: AllianceOrderStatus;
  ticketType: TicketType;
  quantity: number;
  amount: number;
  coinAmount: number;
  customer: CustomerData;
  redirectUrl?: string;
  statusUrl?: string;
  createdAt: string;
  updatedAt: string;
};

type CreateOrderInput = CustomerData & {
  ticketType: TicketType;
  quantity: number;
};

type UpdateOrderInput = Partial<
  Pick<LocalOrder, "hppOrderId" | "ecomOrderId" | "status" | "redirectUrl" | "statusUrl">
>;

const globalStore = globalThis as typeof globalThis & {
  __sbcOrders?: Map<string, LocalOrder>;
};

const orders = globalStore.__sbcOrders ?? new Map<string, LocalOrder>();
globalStore.__sbcOrders = orders;

export function createPendingOrder(input: CreateOrderInput) {
  const ticket = getTicket(input.ticketType);

  if (!ticket) {
    throw new Error("Unsupported ticket type");
  }

  const quantity = Math.min(20, Math.max(1, Math.floor(input.quantity)));
  const now = new Date().toISOString();
  const id = `sbc-${crypto.randomUUID()}`;
  const order: LocalOrder = {
    id,
    merchantRequestId: crypto.randomUUID(),
    status: "CREATED",
    ticketType: ticket.type,
    quantity,
    amount: ticket.priceUah * quantity,
    coinAmount: ticket.coinAmount * quantity,
    customer: {
      name: input.name.trim(),
      phone: input.phone.trim(),
      email: input.email.trim().toLowerCase(),
      telegram: input.telegram?.trim() || undefined,
    },
    createdAt: now,
    updatedAt: now,
  };

  orders.set(id, order);
  return order;
}

export function getOrder(orderId: string | null | undefined) {
  if (!orderId) return undefined;
  return orders.get(orderId);
}

export function findOrderByAnyId(value: string | null | undefined) {
  if (!value) return undefined;

  for (const order of orders.values()) {
    if (
      order.id === value ||
      order.merchantRequestId === value ||
      order.hppOrderId === value ||
      order.ecomOrderId === value
    ) {
      return order;
    }
  }

  return undefined;
}

export function updateOrder(orderId: string, update: UpdateOrderInput) {
  const order = getOrder(orderId);
  if (!order) return undefined;

  const nextOrder: LocalOrder = {
    ...order,
    ...update,
    updatedAt: new Date().toISOString(),
  };

  orders.set(orderId, nextOrder);
  return nextOrder;
}

export function updateOrderByAnyId(value: string, update: UpdateOrderInput) {
  const order = findOrderByAnyId(value);
  if (!order) return undefined;
  return updateOrder(order.id, update);
}

export function serializeOrder(order: LocalOrder) {
  return {
    orderId: order.id,
    merchantRequestId: order.merchantRequestId,
    hppOrderId: order.hppOrderId,
    ecomOrderId: order.ecomOrderId,
    status: order.status,
    ticketType: order.ticketType,
    quantity: order.quantity,
    amount: order.amount,
    coinAmount: order.coinAmount,
    customer: order.customer,
    redirectUrl: order.redirectUrl,
    statusUrl: order.statusUrl,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
  };
}

export function serializePublicOrder(order: LocalOrder) {
  return {
    orderId: order.id,
    merchantRequestId: order.merchantRequestId,
    hppOrderId: order.hppOrderId,
    ecomOrderId: order.ecomOrderId,
    status: order.status,
    ticketType: order.ticketType,
    quantity: order.quantity,
    amount: order.amount,
    coinAmount: order.coinAmount,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
  };
}
