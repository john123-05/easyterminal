import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
import { formatLocaleString, getLocaleFromAcceptLanguage } from "@/lib/i18n";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

function resolveMetadataBase(value?: string) {
  if (!value) {
    return undefined;
  }

  try {
    return new URL(value);
  } catch {
    return undefined;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = getLocaleFromAcceptLanguage((await headers()).get("accept-language"));

  return {
    metadataBase: resolveMetadataBase(siteUrl),
    title: formatLocaleString(locale, "app_title"),
    description: formatLocaleString(locale, "app_description"),
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = getLocaleFromAcceptLanguage((await headers()).get("accept-language"));

  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}
