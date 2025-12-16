import type { Metadata } from "next";
import { Libre_Baskerville, Montserrat, Roboto, Cormorant_Garamond } from "next/font/google";
import CookieBanner from "@/components/CookieBanner";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';

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

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://arcan-transactions.ch';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type PageMetadata = {
  title: string;
  description: string;
};

type MetadataMessages = {
  title: string;
  description: string;
  pages?: {
    home?: PageMetadata;
  };
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const metadata = messages.metadata as MetadataMessages;
  
  // Use home page metadata as default for layout
  const homeMetadata = metadata?.pages?.home;
  const title = homeMetadata?.title || metadata?.title || "Arcan Transactions";
  const description = homeMetadata?.description || metadata?.description || "Transactions d'immeubles de rendement en Suisse";
  
  // Build alternate language links
  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    languages[loc] = `${baseUrl}/${loc}`;
  }
  
  return {
    title: {
      default: title,
      template: '%s',
    },
    description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages,
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${locale}`,
      siteName: 'Arcan Transactions',
      locale: locale === 'fr' ? 'fr_CH' : 'en_US',
      alternateLocale: locale === 'fr' ? ['en_US'] : ['fr_CH'],
      type: 'website',
      images: [
        {
          url: `${baseUrl}/icon.png`,
          width: 1200,
          height: 630,
          alt: 'Arcan Transactions',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${baseUrl}/icon.png`],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Validate locale
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Load messages for this locale
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${libreBaskerville.variable} ${montserrat.variable} ${roboto.variable} ${cormorantGaramond.variable} antialiased`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
          <CookieBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
