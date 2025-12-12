import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, 'criteres', '/criteres');
}

export default function CriteresLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
