"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { formatUah, tickets, type TicketType } from "@/lib/tickets";

type FormState = {
  name: string;
  phone: string;
  email: string;
  telegram: string;
  ticketType: TicketType;
  quantity: string;
};

type Errors = Partial<Record<keyof FormState | "form", string>>;

export function CheckoutForm({ defaultTicket }: { defaultTicket: string }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    email: "",
    telegram: "",
    ticketType: tickets.some((ticket) => ticket.type === defaultTicket)
      ? (defaultTicket as TicketType)
      : "BUSINESS",
    quantity: "1",
  });

  const selectedTicket = tickets.find((ticket) => ticket.type === form.ticketType) ?? tickets[1];
  const quantity = Math.max(Number(form.quantity) || 1, 1);
  const total = selectedTicket.priceUah * quantity;

  const fieldErrors = useMemo(() => errors, [errors]);

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value as never }));
    setErrors((current) => ({ ...current, [field]: undefined, form: undefined }));
  }

  function validate() {
    const nextErrors: Errors = {};

    if (form.name.trim().length < 2) nextErrors.name = "Вкажіть ім'я та прізвище.";
    if (!/^\+?[0-9\s().-]{7,}$/.test(form.phone.trim())) nextErrors.phone = "Вкажіть коректний номер телефону.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) nextErrors.email = "Email має містити @ та домен.";
    if (!tickets.some((ticket) => ticket.type === form.ticketType)) nextErrors.ticketType = "Оберіть тип квитка.";
    if (!/^[1-9][0-9]*$/.test(form.quantity.trim()) || Number(form.quantity) > 20) {
      nextErrors.quantity = "Кількість має бути цілим числом від 1 до 20.";
    }

    return nextErrors;
  }

  async function submitOrder(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;

    const nextErrors = validate();

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      const firstInvalid = document.querySelector<HTMLElement>("[aria-invalid='true']");
      firstInvalid?.focus();
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const orderResponse = await fetch("/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          quantity: Number(form.quantity),
        }),
      });

      if (!orderResponse.ok) throw new Error("order");
      const order = (await orderResponse.json()) as { orderId: string };

      const paymentResponse = await fetch("/api/payments/alliance/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: order.orderId }),
      });

      if (!paymentResponse.ok) throw new Error("payment");
      const payment = (await paymentResponse.json()) as { redirectUrl?: string };

      router.push(payment.redirectUrl ?? `/pending?order=${order.orderId}`);
    } catch {
      setErrors({
        form: "Не вдалося створити платіж. Перевірте дані та спробуйте ще раз.",
      });
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={submitOrder} className="glass-panel grid gap-5 rounded-lg p-5 sm:p-7" aria-busy={isSubmitting}>
      {fieldErrors.form ? (
        <div className="notice border-red-300/30 bg-red-500/10 text-red-100" role="alert">
          {fieldErrors.form}
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <div className="field">
          <label htmlFor="name">Ім&apos;я та прізвище *</label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
            aria-invalid={fieldErrors.name ? "true" : undefined}
            aria-describedby={fieldErrors.name ? "name-error" : undefined}
          />
          {fieldErrors.name ? <p id="name-error" className="field-error">{fieldErrors.name}</p> : null}
        </div>

        <div className="field">
          <label htmlFor="phone">Телефон *</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            aria-invalid={fieldErrors.phone ? "true" : undefined}
            aria-describedby={fieldErrors.phone ? "phone-error" : undefined}
          />
          {fieldErrors.phone ? <p id="phone-error" className="field-error">{fieldErrors.phone}</p> : null}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="field">
          <label htmlFor="email">Email *</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            spellCheck={false}
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            aria-invalid={fieldErrors.email ? "true" : undefined}
            aria-describedby={fieldErrors.email ? "email-error" : undefined}
          />
          {fieldErrors.email ? <p id="email-error" className="field-error">{fieldErrors.email}</p> : null}
        </div>

        <div className="field">
          <label htmlFor="telegram">Telegram</label>
          <input
            id="telegram"
            name="telegram"
            autoComplete="off"
            spellCheck={false}
            placeholder="@username"
            value={form.telegram}
            onChange={(event) => updateField("telegram", event.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_.55fr]">
        <div className="field">
          <label htmlFor="ticketType">Тип квитка *</label>
          <select
            id="ticketType"
            name="ticketType"
            value={form.ticketType}
            onChange={(event) => updateField("ticketType", event.target.value)}
            aria-invalid={fieldErrors.ticketType ? "true" : undefined}
            aria-describedby={fieldErrors.ticketType ? "ticket-error" : undefined}
          >
            {tickets.map((ticket) => (
              <option key={ticket.type} value={ticket.type}>
                {ticket.type} - {formatUah(ticket.priceUah)}
              </option>
            ))}
          </select>
          {fieldErrors.ticketType ? <p id="ticket-error" className="field-error">{fieldErrors.ticketType}</p> : null}
        </div>

        <div className="field">
          <label htmlFor="quantity">Кількість *</label>
          <input
            id="quantity"
            name="quantity"
            inputMode="numeric"
            pattern="[0-9]*"
            value={form.quantity}
            onChange={(event) => updateField("quantity", event.target.value)}
            aria-invalid={fieldErrors.quantity ? "true" : undefined}
            aria-describedby={fieldErrors.quantity ? "quantity-error" : undefined}
          />
          {fieldErrors.quantity ? <p id="quantity-error" className="field-error">{fieldErrors.quantity}</p> : null}
        </div>
      </div>

      <div className="notice">
        Оплата проходить через захищену платіжну сторінку AlliancePay. Дані платіжної картки не зберігаються на сайті. До оплати:{" "}
        <strong className="text-[var(--color-accent)]">{formatUah(total)}</strong>.
      </div>

      <button type="submit" className="button-primary min-h-12 w-full px-7" disabled={isSubmitting}>
        {isSubmitting ? "Переходимо до AlliancePay..." : "Купити квиток"}
      </button>
    </form>
  );
}
