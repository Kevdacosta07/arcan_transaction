import CookieBanner from "@/components/CookieBanner";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";

export default async function RootLocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  setRequestLocale("fr");
  const messages = await getMessages({ locale: "fr" });

  return (
    <NextIntlClientProvider locale="fr" messages={messages}>
      {children}
      <CookieBanner />
    </NextIntlClientProvider>
  );
}
