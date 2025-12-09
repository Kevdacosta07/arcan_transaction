import type { Metadata } from "next";
import { Libre_Baskerville, Montserrat, Roboto, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";

const libreBaskerville = Libre_Baskerville({
  variable: "--font-libre-baskerville",
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arcan Transactions",
  description: "Transactions d'immeubles de rendement en Suisse - Segment institutionnel et professionnel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${libreBaskerville.variable} ${montserrat.variable} ${roboto.variable} ${cormorantGaramond.variable} antialiased`}
      >
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
