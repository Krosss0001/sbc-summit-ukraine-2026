import type { Metadata } from "next";
import { SiteFooter } from "./SiteFooter";
import "./globals.css";

export const metadata: Metadata = {
  title: "SBC Summit Ukraine 2026  RAVE'ERA GROUP",
  description:
    "SBC Summit Ukraine 2026 від RAVE'ERA GROUP: конференція зі спортивного маркетингу, квитки, умови участі та захищена оплата AlliancePay.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "SBC Summit Ukraine 2026  RAVE'ERA GROUP",
    description:
      "Всеукраїнська конференція зі спортивного маркетингу. Квитки SPORT, BUSINESS та ONLINE із захищеною оплатою AlliancePay.",
    type: "website",
    locale: "uk_UA",
    siteName: "RAVE'ERA GROUP",
  },
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
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
