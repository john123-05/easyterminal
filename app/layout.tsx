import type { Metadata } from "next";
import "./globals.css";

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

export const metadata: Metadata = {
  metadataBase: resolveMetadataBase(siteUrl),
  title: "EasyTerminal Demo",
  description:
    "Eigenstaendige Demo fuer den EasyTerminal-Bildschirm mit durchlaufenden Bildern, QR-Codes und Intro-Popup.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}

