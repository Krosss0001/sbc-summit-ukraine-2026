export type TicketType = "SPORT" | "BUSINESS" | "ONLINE";

export type Ticket = {
  type: TicketType;
  priceUah: number;
  coinAmount: number;
  description: string;
  benefits: string[];
};

export const tickets: Ticket[] = [
  {
    type: "SPORT",
    priceUah: 2500,
    coinAmount: 250000,
    description: "Для спортивних фахівців, клубів, команд і персональної участі.",
    benefits: [
      "Доступ до всіх основних виступів",
      "Виставкова зона та партнерські активації",
      "Networking lounge протягом дня",
      "Матеріали конференції після події",
    ],
  },
  {
    type: "BUSINESS",
    priceUah: 6500,
    coinAmount: 650000,
    description: "Преміальний формат для керівників, партнерів і бізнес-команд.",
    benefits: [
      "Усі переваги SPORT",
      "Пріоритетна реєстрація та кращі місця",
      "Закриті business networking сесії",
      "Вечірній reception та after-hours програма",
      "Окремий бізнес-бейдж для швидких знайомств",
    ],
  },
  {
    type: "ONLINE",
    priceUah: 1000,
    coinAmount: 100000,
    description: "Дистанційний доступ до трансляції та матеріалів конференції.",
    benefits: [
      "Live stream ключових сцен",
      "Записи виступів після події",
      "Digital networking канал",
      "Сертифікат учасника",
    ],
  },
];

export function getTicket(type: string | null | undefined) {
  return tickets.find((ticket) => ticket.type === type);
}

export function formatUah(value: number) {
  return `${value.toLocaleString("uk-UA")} грн`;
}
