import Image from "next/image";
import Link from "next/link";
import { LandingHeader } from "./LandingHeader";
import { formatUah, tickets } from "@/lib/tickets";

const speakers = [
  "Матвій Бідний",
  "Вадим Гутцайт",
  "Олександр Шовковський",
  "Дар'я Білодід",
  "Станіслав Горуна",
  "Ольга Саладуха",
  "Людмила Лузан",
  "Ігор Ніконов",
  "Adidas Україна",
  "MEGOGO",
  "Netpeak",
];

const stats = [
  ["1500+", "учасників"],
  ["60+", "спікерів"],
  ["09:30-23:00", "програма"],
  ["3", "формати квитків"],
];

const expectations = [
  "Практичні кейси клубів, федерацій, ліг та брендів",
  "Діалог бізнесу, медіа і спортивних інституцій",
  "Партнерства, які переходять з нетворкінгу у реальні угоди",
  "Fan engagement, digital, sponsorship та media rights",
];

const faqs = [
  ["Де відбудеться подія?", "27 травня 2026 року у КВЦ Парковий за адресою м. Київ, Паркова дорога, 16А."],
  ["Як проходить оплата?", "Після заповнення форми сайт створює замовлення і перенаправляє вас на захищену HPP-сторінку AlliancePay."],
  ["Коли буде доступний квиток?", "Квиток відкривається після підтвердження успішної оплати від AlliancePay."],
  ["Які формати квитків доступні?", "SPORT за 2500 грн, BUSINESS за 6500 грн та ONLINE за 1000 грн."],
];

const legalItems = [
  ["Організатор", "Організатор події: Sport&Business Club. Технічна та маркетингова підтримка сторінки: Rave'era Group, Concerts & Marketing Agency."],
  ["Контакти", "З питань участі, оплати, квитків і повернення коштів звертайтеся на support@sbc-summit.ua. Час відповіді: у робочі дні."],
  ["Умови участі", "Купуючи квиток, учасник погоджується з умовами участі у SBC Summit Ukraine 2026, правилами доступу на подію та електронною видачею квитка."],
  ["Конфіденційність", "Персональні дані використовуються для оформлення замовлення, комунікації щодо події, видачі квитка та виконання вимог платіжного провайдера."],
  ["Повернення коштів", "Повернення коштів розглядається за зверненням на контактну пошту організатора відповідно до умов квитка, статусу оплати та строків до дати події."],
  ["Безпека платежу", "Оплата проходить через захищену платіжну сторінку AlliancePay. Дані платіжної картки не зберігаються на сайті."],
];

function SectionHeading({
  number,
  label,
  title,
}: {
  number: string;
  label: string;
  title: string;
}) {
  return (
    <div className="section-heading">
      <span>{number}</span>
      <div>
        <p className="eyebrow">{label}</p>
        <h2 className="section-title">{title}</h2>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="site-shell min-h-screen overflow-hidden text-white">
      <LandingHeader />

      <section id="top" className="relative px-4 pb-20 pt-32 sm:px-6 md:pt-28 lg:px-8 lg:pb-28">
        <div className="mx-auto grid max-w-7xl gap-10 lg:min-h-[calc(100svh-7rem)] lg:grid-cols-[55fr_45fr] lg:items-center">
          <div className="reveal">
            <p className="outline-label">RAVE&apos;ERA GROUP · EVENT LANDING</p>
            <h1 className="hero-title mt-6">
              SBC SUMMIT
              <span>UKRAINE 2026</span>
            </h1>
            <p className="mt-6 max-w-3xl border-l border-[var(--color-accent)] pl-4 text-lg font-semibold uppercase leading-7 tracking-wide text-[var(--color-accent)] sm:text-xl">
              Всеукраїнська конференція зі спортивного маркетингу
            </p>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/68">
              П&apos;ятий, ювілейний SBC Summit Ukraine 2026 стане найбільшим зібранням лідерів галузі: клубів, федерацій, ліг, маркетологів, медіа, спортсменів та підприємців.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {["27 травня 2026", "09:30 - 23:00", "КВЦ Парковий, Київ"].map((item) => (
                <div className="hero-badge" key={item}>{item}</div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link className="button-primary min-h-12 px-7" href="/checkout">
                Купити квиток
              </Link>
              <a className="button-secondary min-h-12 px-7" href="#program">
                Дивитись програму
              </a>
            </div>
            <p className="mt-5 max-w-xl text-sm leading-6 text-white/58">
              Оплата проходить через захищену платіжну сторінку AlliancePay. Дані платіжної картки не зберігаються на сайті.
            </p>
          </div>

          <div className="hero-visual reveal">
            <div className="hero-poster-glow" aria-hidden="true">
              <Image
                src="/events/sbc-summit/sbc-hero.jpg"
                alt=""
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="hero-image-card">
              <Image
                src="/events/sbc-summit/sbc-hero.jpg"
                alt="SBC Summit Ukraine event venue and audience"
                fill
                priority
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="object-contain"
              />
              <div className="hero-reflection" aria-hidden="true" />
              <div className="hero-card-caption">
                <span>27.05</span>
                <span>КВЦ PARKOVY</span>
                <strong>1500+ attendees</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="stats-grid">
          {stats.map(([value, label]) => (
            <div className="stat-card reveal" key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="about" className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[.85fr_1.15fr]">
          <SectionHeading number="01" label="Подія" title="Sport business conference powered by RaveEra event-tech." />
          <div className="reveal space-y-5 text-base leading-8 text-white/70">
            <p>
              SBC Summit Ukraine 2026 збирає 1500 учасників з усієї країни та 60+ топ-спікерів в одному просторі для сильних партнерств.
            </p>
            <p>
              Фокус події - практичні кейси, sponsorship, digital, media rights, фанатська економіка та нові revenue-моделі для українського спорту.
            </p>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="platform-block reveal">
          <div>
            <p className="outline-label">SERVICE LAYER</p>
            <h2>RaveEra Tickets Service</h2>
          </div>
          <p>
            Захищена реєстрація, оплата через AlliancePay, QR-квиток після підтвердження.
          </p>
          <div className="trust-note">Оплата проходить через захищену платіжну сторінку AlliancePay. Дані платіжної картки не зберігаються на сайті.</div>
        </div>
      </section>

      <section id="speakers" className="section-shell">
        <SectionHeading number="02" label="Спікери" title="Лідери спорту, бізнесу та медіа" />
        <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {speakers.map((speaker, index) => (
            <div className="speaker-card reveal" key={speaker} style={{ animationDelay: `${index * 35}ms` }}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{speaker}</strong>
            </div>
          ))}
        </div>
      </section>

      <section id="program" className="section-shell">
        <div className="glass-panel reveal grid gap-8 p-5 sm:p-8 lg:grid-cols-[.8fr_1.2fr]">
          <SectionHeading number="03" label="Програма" title="День для рішень, контактів і нової оптики ринку." />
          <div className="grid gap-3">
            {expectations.map((item) => (
              <div className="expect-row" key={item}>
                <span aria-hidden="true" />
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="tickets" className="section-shell">
        <SectionHeading number="04" label="Квитки" title="Три формати участі з прозорою ціною" />
        <div className="mt-9 grid gap-4 lg:grid-cols-3">
          {tickets.map((ticket) => (
            <article className={`ticket-card reveal ${ticket.type === "BUSINESS" ? "ticket-featured" : ""}`} key={ticket.type}>
              <div>
                <p className="outline-label w-fit">{ticket.type}</p>
                <h3 className="mt-5 text-4xl font-black uppercase">{formatUah(ticket.priceUah)}</h3>
                <p className="mt-3 min-h-12 text-sm leading-6 text-white/62">{ticket.description}</p>
              </div>
              <ul className="mt-7 space-y-3 text-sm text-white/76">
                {ticket.benefits.map((benefit) => (
                  <li className="flex gap-3" key={benefit}>
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)] shadow-[0_0_16px_var(--color-accent)]" />
                    {benefit}
                  </li>
                ))}
              </ul>
              <Link className={ticket.type === "BUSINESS" ? "button-primary mt-8 min-h-12 w-full" : "button-secondary mt-8 min-h-12 w-full"} href={`/checkout?ticket=${ticket.type}`}>
                Купити квиток
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section id="location" className="section-shell grid gap-8 lg:grid-cols-[.85fr_1.15fr]">
        <SectionHeading number="05" label="Локація" title="КВЦ Парковий, Київ" />
        <div className="venue-card reveal">
          <div>
            <span>Адреса</span>
            <strong>м. Київ, Паркова дорога, 16А</strong>
          </div>
          <div>
            <span>Venue</span>
            <strong>КВЦ Парковий</strong>
          </div>
          <div>
            <span>Тривалість</span>
            <strong>09:30 - 23:00</strong>
          </div>
        </div>
      </section>

      <section id="faq" className="section-shell">
        <SectionHeading number="06" label="FAQ" title="Питання перед реєстрацією" />
        <div className="mt-9 grid gap-3">
          {faqs.map(([q, a]) => (
            <details className="faq-item reveal" key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="px-4 pb-12 sm:px-6 lg:px-8">
        <div className="final-cta mx-auto max-w-7xl">
          <p className="outline-label w-fit">FINAL CTA</p>
          <h2>Будьте в залі, де формується спортивний бізнес 2026 року.</h2>
          <Link className="button-primary mt-7 min-h-12 px-7" href="/checkout">
            Купити квиток
          </Link>
        </div>
      </section>

      <footer className="border-t border-[var(--color-accent)]/20 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto mb-6 flex max-w-7xl flex-col justify-between gap-3 sm:flex-row">
          <div className="brand-mark">
            <span>Rave&apos;era Group</span>
            <small>Concerts &amp; Marketing Agency</small>
          </div>
          <p className="max-w-xl text-sm leading-6 text-white/54">
            Професійна сторінка події для реєстрації, оплати та видачі квитків SBC Summit Ukraine 2026.
          </p>
        </div>
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2 lg:grid-cols-3">
          {legalItems.map(([title, text]) => (
            <div className="legal-card" key={title}>
              <strong>{title}</strong>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </footer>
    </main>
  );
}
