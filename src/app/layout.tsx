import type { Metadata } from "next";
import { SiteFooter } from "./SiteFooter";
import "./globals.css";

export const metadata: Metadata = {
  title: "SBC Summit Ukraine 2026",
  description:
    "Всеукраїнська конференція зі спортивного маркетингу SBC Summit Ukraine 2026 від Sport&Business Club.",
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
