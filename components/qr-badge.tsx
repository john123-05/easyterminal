"use client";

import { QRCodeSVG } from "qrcode.react";
import { formatLocaleString, type Locale } from "@/lib/i18n";
import { buildClaimUrl, shortClaimCode } from "@/lib/qr";
import type { GalleryPhoto } from "@/types/photo";

type QrBadgeProps = {
  locale: Locale;
  photo: GalleryPhoto;
};

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || null;

export function QrBadge({ locale, photo }: QrBadgeProps) {
  const browserOrigin =
    typeof window !== "undefined" && window.location.origin ? window.location.origin : null;

  const qrValue = buildClaimUrl(photo.resolvedClaimCode, {
    siteUrl: configuredSiteUrl,
    browserOrigin,
  });

  return (
    <div className="grid h-full grid-rows-[auto_1fr_auto] border-l border-line pl-3 sm:pl-4">
      <div>
        <div className="h-px w-8 bg-accent sm:w-10" />
        <p className="mt-3 text-[10px] uppercase tracking-[0.24em] text-ink-soft">
          {formatLocaleString(locale, "qr_scan_your")}
        </p>
        <p className="mt-1 text-[10px] uppercase tracking-[0.24em] text-ink-soft">
          {formatLocaleString(locale, "qr_image")}
        </p>
      </div>

      <div className="flex items-end py-3 sm:py-4">
        <div className="w-full overflow-hidden border border-line bg-white p-1.5 sm:p-2">
          {qrValue ? (
            <QRCodeSVG
              value={qrValue}
              size={88}
              marginSize={0}
              bgColor="#ffffff"
              fgColor="#111827"
              className="h-auto w-full"
            />
          ) : (
            <div className="aspect-square w-full bg-page-strong" />
          )}
        </div>
      </div>

      <div>
        <p className="truncate text-[10px] text-ink-soft">{shortClaimCode(photo.resolvedClaimCode)}</p>
      </div>
    </div>
  );
}
