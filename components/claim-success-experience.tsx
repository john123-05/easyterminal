"use client";

import { useEffect, useState } from "react";
import { formatLocaleString, type Locale } from "@/lib/i18n";
import type { ClaimOrderApiResponse } from "@/types/claim";

type ClaimSuccessExperienceProps = {
  locale: Locale;
  sessionId?: string;
  orderId?: string;
  token?: string;
};

type LoadState =
  | { kind: "loading" }
  | { kind: "error"; message: string }
  | { kind: "ready"; payload: ClaimOrderApiResponse };

function buildOrderUrl(props: ClaimSuccessExperienceProps) {
  if (props.sessionId) {
    return `/api/claim/order?session_id=${encodeURIComponent(props.sessionId)}`;
  }

  if (props.orderId && props.token) {
    return `/api/claim/order?order=${encodeURIComponent(props.orderId)}&token=${encodeURIComponent(props.token)}`;
  }

  return null;
}

export function ClaimSuccessExperience(props: ClaimSuccessExperienceProps) {
  const { locale } = props;
  const [state, setState] = useState<LoadState>({ kind: "loading" });
  const [shareMessage, setShareMessage] = useState<string | null>(null);
  const [downloadMessage, setDownloadMessage] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [showShareLinks, setShowShareLinks] = useState(false);

  const order = state.kind === "ready" ? state.payload : null;
  const isPaid = order?.status === "paid";
  const orderUrl = buildOrderUrl(props);
  const shareUrl = order?.shareUrl ?? "";

  useEffect(() => {
    if (!orderUrl) {
      return;
    }

    let cancelled = false;

    const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    const load = async () => {
      for (let attempt = 0; attempt < 16; attempt += 1) {
        const response = await fetch(orderUrl, {
          cache: "no-store",
        });

        const payload = (await response.json()) as
          | ClaimOrderApiResponse
          | { error?: string; status?: string };

        if (cancelled) {
          return;
        }

        if (!response.ok) {
          setState({
            kind: "error",
            message: payload && typeof payload === "object" && "error" in payload && payload.error
              ? payload.error
              : formatLocaleString(locale, "success_load_failed_body"),
          });
          return;
        }

        const typedPayload = payload as ClaimOrderApiResponse;

        if (typedPayload.status === "paid") {
          setState({ kind: "ready", payload: typedPayload });
          return;
        }

        setState({ kind: "ready", payload: typedPayload });
        await wait(1800);
      }
    };

    void load();

    return () => {
      cancelled = true;
    };
  }, [locale, orderUrl]);

  if (!orderUrl) {
    return (
      <main className="min-h-screen bg-page px-4 py-6 text-ink sm:px-6">
        <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-md items-center">
          <div className="w-full border border-line bg-white p-6 sm:p-7">
            <h1 className="text-2xl font-semibold tracking-[-0.03em] text-ink">
              {formatLocaleString(locale, "success_load_failed_body")}
            </h1>
            <p className="mt-4 text-sm leading-7 text-ink-soft">
              {formatLocaleString(locale, "success_missing_body")}
            </p>
          </div>
        </div>
      </main>
    );
  }

  const handleDownload = async () => {
    if (!isPaid) {
      return;
    }

    try {
      setIsDownloading(true);
      setDownloadMessage(null);

      if (order?.photo.resolvedImageUrl) {
        window.location.assign(order.photo.resolvedImageUrl);
        setDownloadMessage(formatLocaleString(locale, "download_started"));
        return;
      }

      throw new Error(formatLocaleString(locale, "download_failed"));
    } catch (error) {
      setDownloadMessage(
        error instanceof Error ? error.message : formatLocaleString(locale, "download_failed"),
      );
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = async () => {
    if (!isPaid) {
      return;
    }

    try {
      setIsSharing(true);
      setShareMessage(null);
      setShowShareLinks(false);

      if (navigator.share && shareUrl) {
        await navigator.share({
          title: formatLocaleString(locale, "share_title"),
          text: formatLocaleString(locale, "share_native_text"),
          url: shareUrl,
        });
        setShareMessage(null);
        return;
      }

      setShowShareLinks(true);
    } catch (error) {
      setShareMessage(
        error instanceof Error ? error.message : formatLocaleString(locale, "share_cancelled"),
      );
    } finally {
      setIsSharing(false);
    }
  };

  if (state.kind === "error") {
    return (
      <main className="min-h-screen bg-page px-4 py-6 text-ink sm:px-6">
        <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-md items-center">
          <div className="w-full border border-line bg-white p-6 sm:p-7">
            <h1 className="text-2xl font-semibold tracking-[-0.03em] text-ink">
              {formatLocaleString(locale, "success_load_failed_title")}
            </h1>
            <p className="mt-4 text-sm leading-7 text-ink-soft">{state.message}</p>
          </div>
        </div>
      </main>
    );
  }

  const whatsappUrl = shareUrl
    ? `https://wa.me/?text=${encodeURIComponent(shareUrl)}`
    : "#";
  const facebookUrl = shareUrl
    ? `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    : "#";
  const xUrl = shareUrl
    ? `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`
    : "#";
  const instagramUrl = "https://www.instagram.com/";
  const tiktokUrl = "https://www.tiktok.com/";

  return (
    <main className="min-h-screen bg-page px-4 py-6 text-ink sm:px-6">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-md flex-col justify-between">
        <section className="overflow-hidden border border-line bg-white">
          <div className="relative aspect-[4/5] overflow-hidden bg-[#f4f2ee]">
            {order ? (
              <img
                src={order.photo.resolvedImageUrl}
                alt="Unlocked image"
                className={`h-full w-full object-contain transition duration-500 ${
                  isPaid ? "blur-0" : "blur-md"
                }`}
              />
            ) : (
              <div className="h-full w-full animate-pulse bg-page-strong" />
            )}
          </div>
        </section>

        <section className="mt-5 border border-line bg-white p-5 sm:p-6">
          <p className="text-[11px] uppercase tracking-[0.28em] text-accent">Checkout</p>
          <h1 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-ink">
            {isPaid
              ? formatLocaleString(locale, "success_ready_title")
              : formatLocaleString(locale, "success_pending_title")}
          </h1>
          <p className="mt-4 text-sm leading-7 text-ink-soft">
            {isPaid
              ? formatLocaleString(locale, "success_ready_body")
              : formatLocaleString(locale, "success_pending_body")}
          </p>

          <div className="mt-6 grid gap-3">
            <button
              type="button"
              onClick={() => {
                void handleDownload();
              }}
              disabled={!isPaid || isDownloading}
              className={`inline-flex w-full items-center justify-center px-5 py-4 text-sm font-semibold ${
                isPaid && !isDownloading
                  ? "bg-ink text-white transition hover:bg-ink/90"
                  : "pointer-events-none border border-line bg-page text-ink-soft"
              }`}
            >
              {isDownloading
                ? formatLocaleString(locale, "save_preparing")
                : formatLocaleString(locale, "save_image")}
            </button>

            <button
              type="button"
              onClick={handleShare}
              disabled={!isPaid || isSharing}
              className={`inline-flex w-full items-center justify-center border px-5 py-4 text-sm font-semibold ${
                isPaid && !isSharing
                  ? "border-line bg-white text-ink transition hover:border-ink"
                  : "pointer-events-none border-line bg-page text-ink-soft"
              }`}
            >
              {isSharing
                ? formatLocaleString(locale, "share_preparing")
                : formatLocaleString(locale, "share_image")}
            </button>
          </div>

          {downloadMessage ? <p className="mt-4 text-sm text-ink-soft">{downloadMessage}</p> : null}
          {shareMessage ? <p className="mt-4 text-sm text-ink-soft">{shareMessage}</p> : null}

          {showShareLinks ? (
            <div className="mt-5 grid gap-2 border border-line bg-page p-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center border border-line bg-white px-4 py-3 text-sm font-semibold text-ink"
              >
                WhatsApp
              </a>
              <a
                href={facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center border border-line bg-white px-4 py-3 text-sm font-semibold text-ink"
              >
                Facebook
              </a>
              <a
                href={xUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center border border-line bg-white px-4 py-3 text-sm font-semibold text-ink"
              >
                X
              </a>
              <button
                type="button"
                onClick={async () => {
                  if (!shareUrl || !navigator.clipboard?.writeText) {
                    return;
                  }
                  await navigator.clipboard.writeText(shareUrl);
                  setShareMessage(`Instagram: ${formatLocaleString(locale, "share_copied")}`);
                  window.open(instagramUrl, "_blank", "noopener,noreferrer");
                }}
                className="inline-flex items-center justify-center border border-line bg-white px-4 py-3 text-sm font-semibold text-ink"
              >
                Instagram
              </button>
              <button
                type="button"
                onClick={async () => {
                  if (!shareUrl || !navigator.clipboard?.writeText) {
                    return;
                  }
                  await navigator.clipboard.writeText(shareUrl);
                  setShareMessage(`TikTok: ${formatLocaleString(locale, "share_copied")}`);
                  window.open(tiktokUrl, "_blank", "noopener,noreferrer");
                }}
                className="inline-flex items-center justify-center border border-line bg-white px-4 py-3 text-sm font-semibold text-ink"
              >
                TikTok
              </button>
            </div>
          ) : null}
        </section>
      </div>
    </main>
  );
}
