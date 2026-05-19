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
      "Відвідування конференції та експозони партнерів",
      "Вхід в закриту спільноту Sport&Business Club Україна",
      "Нетворкінг із близько 1500 профільними учасниками конференції",
      "Пакет учасника",
      "Фото/відео звіт з заходу",
    ],
  },
  {
    type: "BUSINESS",
    priceUah: 6500,
    coinAmount: 650000,
    description: "Преміальний формат для керівників, партнерів і бізнес-команд.",
    benefits: [
      "Доступ у бізнес-lounge та зону спікерів",
      "Ексклюзивний нетворкінг з ключовими представниками спорту, бізнесу та медіа",
      "Зона гостинності від партнерів",
      "Пріоритетний вхід на захід",
      "Місця в 14 рядах залу",
      "Доступ до презентацій спікерів",
      "Відеозапис заходу",
      "Безкоштовне паркомісце",
    ],
  },
  {
    type: "ONLINE",
    priceUah: 1000,
    coinAmount: 100000,
    description: "Дистанційний доступ до трансляції та матеріалів конференції.",
    benefits: [
      "Доступ до онлайн-трансляції конференції",
      "Відеозапис заходу",
    ],
  },
];

export function getTicket(type: string | null | undefined) {
  return tickets.find((ticket) => ticket.type === type);
}

export function formatUah(value: number) {
  return `${value.toLocaleString("uk-UA")} грн`;
}
