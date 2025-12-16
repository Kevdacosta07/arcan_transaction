import type { Metadata } from 'next';
import { getMessages } from 'next-intl/server';
import { routing } from '@/i18n/routing';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://arcan-transactions.ch';

type PageKey = 'home' | 'contact' | 'realisations' | 'criteres' | 'procedureDeVente' | 'mentionsLegales';

interface PageMetadata {
  title: string;
  description: string;
}

interface MetadataMessages {
  title: string;
  description: string;
  pages?: Record<PageKey, PageMetadata>;
}

export async function generatePageMetadata(
  locale: string,
  pageKey: PageKey,
  pathname: string
): Promise<Metadata> {
  const messages = await getMessages({ locale });
  const metadata = messages.metadata as MetadataMessages;
  
  const pageMetadata = metadata?.pages?.[pageKey];
  const title = pageMetadata?.title || metadata?.title || "Arcan Transactions";
  const description = pageMetadata?.description || metadata?.description || "Transactions d'immeubles de rendement en Suisse";
  
  // Build alternate language links for this specific page
  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    languages[loc] = `${baseUrl}/${loc}${pathname}`;
  }
  
  return {
    title,
    description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${locale}${pathname}`,
      languages,
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${locale}${pathname}`,
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
