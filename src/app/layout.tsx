import type { Metadata } from "next";
import { tickets } from "@/lib/tickets";
import { SiteFooter } from "./SiteFooter";
import "./globals.css";

const siteUrl = "https://www.rave-era.pp.ua";
const metadataTitle = "SBC Summit Ukraine 2026  RAVE'ERA GROUP";
const metadataDescription =
  "Всеукраїнська конференція зі спортивного маркетингу у Києві. Квитки, спікери, networking, sport business, media, sponsorship та AlliancePay HPP checkout.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: metadataTitle,
  description: metadataDescription,
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: metadataTitle,
    description: metadataDescription,
    url: siteUrl,
    type: "website",
    locale: "uk_UA",
    siteName: "RAVE'ERA GROUP",
    images: [
      {
        url: "/events/sbc-summit/sbc-hero.jpg",
        width: 1849,
        height: 1080,
        alt: "SBC Summit Ukraine 2026 by RAVE'ERA GROUP",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: metadataTitle,
    description: metadataDescription,
    images: ["/events/sbc-summit/sbc-hero.jpg"],
  },
};

const eventStructuredData = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "SBC Summit Ukraine 2026",
  startDate: "2026-05-27T09:30:00+03:00",
  endDate: "2026-05-27T23:00:00+03:00",
  eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  location: {
    "@type": "Place",
    name: "КВЦ Парковий",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Київ",
      streetAddress: "Паркова дорога, 16А",
      addressCountry: "UA",
    },
  },
  organizer: {
    "@type": "Organization",
    name: "RAVE'ERA GROUP / ФОП Чекан Богдан Орестович",
    url: siteUrl,
  },
  offers: tickets.map((ticket) => ({
    "@type": "Offer",
    name: `${ticket.type} ticket`,
    url: `${siteUrl}/checkout?ticket=${ticket.type}`,
    price: ticket.priceUah,
    priceCurrency: "UAH",
    availability: "https://schema.org/InStock",
  })),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="uk"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(eventStructuredData).replace(/</g, "\\u003c"),
          }}
        />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
