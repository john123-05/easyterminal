"use client";

import { useMemo, useState } from "react";
import { formatLocaleString, type Locale } from "@/lib/i18n";

type DemoSuccessExperienceProps = {
  locale: Locale;
  photoUrl: string;
  claimCode: string;
};

function canShareFiles(file: File) {
  return Boolean(
    "canShare" in navigator &&
      typeof navigator.canShare === "function" &&
      navigator.canShare({ files: [file] }),
  );
}

export function DemoSuccessExperience({
  locale,
  photoUrl,
  claimCode,
}: DemoSuccessExperienceProps) {
  const [shareMessage, setShareMessage] = useState<string | null>(null);
  const [downloadMessage, setDownloadMessage] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const shareUrl = useMemo(() => photoUrl, [photoUrl]);
  const downloadUrl = useMemo(
    () => `/api/claim/demo-download?code=${encodeURIComponent(claimCode)}`,
    [claimCode],
  );

  async function loadDownloadAsset() {
    const response = await fetch(downloadUrl, {
      cache: "no-store",
    });

    let serverError: string | null = null;

    if (!response.ok) {
      const contentType = response.headers.get("content-type") ?? "";

      if (contentType.includes("application/json")) {
        const payload = (await response.json()) as { error?: string };
        serverError = payload.error ?? null;
      }

      throw new Error(serverError || formatLocaleString(locale, "download_failed"));
    }

    const blob = await response.blob();
    const contentType = response.headers.get("content-type") ?? blob.type ?? "image/jpeg";
    const disposition = response.headers.get("content-disposition") ?? "";
    const fileNameMatch =
      disposition.match(/filename\*=UTF-8''([^;]+)/i) ??
      disposition.match(/filename=\"?([^\";]+)\"?/i);
    const fileName = fileNameMatch?.[1]
      ? decodeURIComponent(fileNameMatch[1])
      : `${claimCode || "liftpictures-demo"}.jpg`;
    const file = new File([blob], fileName, {
      type: contentType,
    });

    return { blob, file, fileName };
  }

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      setDownloadMessage(null);

      const { blob, file, fileName } = await loadDownloadAsset();

      if (canShareFiles(file)) {
        await navigator.share({
          title: formatLocaleString(locale, "save_image"),
          text: formatLocaleString(locale, "share_native_text"),
          files: [file],
        });
        setDownloadMessage(formatLocaleString(locale, "share_sheet_opened"));
        return;
      }

      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      const supportsDownloadAttribute = typeof link.download === "string";

      link.href = objectUrl;
      link.download = fileName;
      link.rel = "noopener";
      link.target = supportsDownloadAttribute ? "_self" : "_blank";
      document.body.appendChild(link);
      link.click();
      link.remove();

      if (!supportsDownloadAttribute) {
        window.open(objectUrl, "_blank", "noopener,noreferrer");
        setDownloadMessage(formatLocaleString(locale, "opened_new_tab"));
      } else {
        setDownloadMessage(formatLocaleString(locale, "download_started"));
      }

      setTimeout(() => {
        URL.revokeObjectURL(objectUrl);
      }, 1500);
    } catch (error) {
      setDownloadMessage(
        error instanceof Error ? error.message : formatLocaleString(locale, "download_failed"),
      );
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = async () => {
    if (!shareUrl) {
      return;
    }

    try {
      setIsSharing(true);
      setShareMessage(null);

      const { file } = await loadDownloadAsset();

      if (canShareFiles(file)) {
        await navigator.share({
          title: formatLocaleString(locale, "share_title"),
          text: formatLocaleString(locale, "share_native_text"),
          files: [file],
        });
        setShareMessage(null);
        return;
      }

      if (navigator.share) {
        await navigator.share({
          title: formatLocaleString(locale, "share_title"),
          text: formatLocaleString(locale, "share_native_text"),
          url: shareUrl,
        });
        setShareMessage(null);
        return;
      }

      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
        setShareMessage(formatLocaleString(locale, "share_copied"));
        return;
      }

      setShareMessage(formatLocaleString(locale, "share_not_available"));
    } catch (error) {
      setShareMessage(
        error instanceof Error ? error.message : formatLocaleString(locale, "share_cancelled"),
      );
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <main className="min-h-screen bg-page px-4 py-6 text-ink sm:px-6">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-md flex-col justify-between">
        <section className="overflow-hidden border border-line bg-white">
          <div className="relative aspect-[4/5] overflow-hidden bg-[#f4f2ee]">
            <img src={photoUrl} alt="Unlocked image" className="h-full w-full object-contain" />
          </div>
        </section>

        <section className="mt-5 border border-line bg-white p-5 sm:p-6">
          <p className="text-[11px] uppercase tracking-[0.28em] text-accent">
            {formatLocaleString(locale, "demo_success_label")}
          </p>
          <h1 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-ink">
            {formatLocaleString(locale, "demo_success_title")}
          </h1>
          <p className="mt-4 text-sm leading-7 text-ink-soft">
            {formatLocaleString(locale, "demo_success_body")}
          </p>

          <div className="mt-6 border border-line bg-page px-4 py-4">
            <p className="text-xs uppercase tracking-[0.22em] text-ink-soft">
              {formatLocaleString(locale, "claim_code_dash")}
            </p>
            <p className="mt-2 break-all text-sm font-medium text-ink">{claimCode}</p>
          </div>

          <div className="mt-6 grid gap-3">
            <button
              type="button"
              onClick={() => {
                void handleDownload();
              }}
              disabled={isDownloading}
              className="inline-flex w-full items-center justify-center bg-ink px-5 py-4 text-sm font-semibold text-white transition hover:bg-ink/90"
            >
              {isDownloading
                ? formatLocaleString(locale, "save_preparing")
                : formatLocaleString(locale, "save_image")}
            </button>

            <button
              type="button"
              onClick={() => {
                void handleShare();
              }}
              disabled={isSharing}
              className="inline-flex w-full items-center justify-center border border-line bg-white px-5 py-4 text-sm font-semibold text-ink transition hover:border-ink"
            >
              {isSharing
                ? formatLocaleString(locale, "share_preparing")
                : formatLocaleString(locale, "share_image")}
            </button>
          </div>

          {downloadMessage ? <p className="mt-4 text-sm text-ink-soft">{downloadMessage}</p> : null}
          {shareMessage ? <p className="mt-4 text-sm text-ink-soft">{shareMessage}</p> : null}
        </section>
      </div>
    </main>
  );
}
