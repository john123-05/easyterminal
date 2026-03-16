"use client";

import { useMemo, useState } from "react";
import { formatLocaleString, LOCALE_TAGS, type Locale } from "@/lib/i18n";

type DemoCheckoutExperienceProps = {
  locale: Locale;
  photoUrl: string;
  claimCode: string;
  defaultName: string;
  email: string;
  priceCents: number;
  currency: string;
};

type DemoPaymentFormState = {
  cardholderName: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
};

function formatPrice(priceCents: number, currency: string, locale: Locale) {
  return new Intl.NumberFormat(LOCALE_TAGS[locale], {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(priceCents / 100);
}

function normalizeCardNumber(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 19);
  return digits.replace(/(.{4})/g, "$1 ").trim();
}

function normalizeExpiry(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) {
    return digits;
  }
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

function normalizeCvc(value: string) {
  return value.replace(/\D/g, "").slice(0, 4);
}

export function DemoCheckoutExperience({
  locale,
  photoUrl,
  claimCode,
  defaultName,
  email,
  priceCents,
  currency,
}: DemoCheckoutExperienceProps) {
  const [formState, setFormState] = useState<DemoPaymentFormState>({
    cardholderName: defaultName,
    cardNumber: "",
    expiry: "",
    cvc: "",
  });
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const priceLabel = useMemo(
    () => formatPrice(priceCents, currency, locale),
    [currency, locale, priceCents],
  );

  const handleSubmit = async () => {
    setSubmitError(null);

    if (
      !formState.cardholderName.trim() ||
      !formState.cardNumber.trim() ||
      !formState.expiry.trim() ||
      !formState.cvc.trim()
    ) {
      setSubmitError(formatLocaleString(locale, "demo_fill_payment_fields"));
      return;
    }

    setIsSubmitting(true);

    const params = new URLSearchParams({
      code: claimCode,
      name: formState.cardholderName.trim(),
      email: email.trim(),
    });

    window.location.assign(`/claim/demo-success?${params.toString()}`);
  };

  return (
    <main className="min-h-screen bg-page px-4 py-6 text-ink sm:px-6">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-md flex-col justify-between">
        <section className="overflow-hidden border border-line bg-white">
          <div className="relative aspect-[4/5] overflow-hidden bg-[#f4f2ee]">
            <img
              src={photoUrl}
              alt="Photo preview"
              className="absolute inset-0 h-full w-full scale-105 object-cover blur-2xl opacity-55"
            />
            <div className="absolute inset-0 bg-white/35" />

            <div className="absolute inset-x-5 top-5 flex items-center justify-between gap-3">
              <div className="border border-white/80 bg-white/85 px-3 py-2 text-[11px] uppercase tracking-[0.22em] text-ink-soft backdrop-blur">
                Demo-Checkout
              </div>
              <div className="border border-white/80 bg-white/85 px-3 py-2 text-sm font-semibold text-ink backdrop-blur">
                {priceLabel}
              </div>
            </div>

            <div className="absolute inset-x-5 bottom-5 overflow-hidden border border-white/75 bg-white/78 p-3 shadow-[0_18px_45px_-30px_rgba(15,23,42,0.35)] backdrop-blur-md">
              <img
                src={photoUrl}
                alt="Photo preview"
                className="h-[16.5rem] w-full object-contain blur-[1.5px] sm:h-[18rem]"
              />
            </div>
          </div>
        </section>

        <section className="mt-5 border border-line bg-white p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.28em] text-accent">
                {formatLocaleString(locale, "payment_label")}
              </p>
              <h1 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-ink">
                {formatLocaleString(locale, "demo_checkout_title")}
              </h1>
            </div>

            <div className="border border-line bg-page px-3 py-2 text-sm font-medium text-ink">
              {priceLabel}
            </div>
          </div>

          <p className="mt-4 text-sm leading-7 text-ink-soft">
            {formatLocaleString(locale, "demo_checkout_body")}
          </p>

          <div className="mt-6 grid gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-ink" htmlFor="cardholderName">
                {formatLocaleString(locale, "card_name")}
              </label>
              <input
                id="cardholderName"
                type="text"
                value={formState.cardholderName}
                onChange={(event) =>
                  setFormState((current) => ({
                    ...current,
                    cardholderName: event.target.value,
                  }))
                }
                className="w-full border border-line bg-white px-4 py-3 text-base text-ink outline-none transition focus:border-ink"
                placeholder={formatLocaleString(locale, "card_name_placeholder")}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-ink" htmlFor="cardNumber">
                {formatLocaleString(locale, "card_number")}
              </label>
              <input
                id="cardNumber"
                inputMode="numeric"
                autoComplete="cc-number"
                value={formState.cardNumber}
                onChange={(event) =>
                  setFormState((current) => ({
                    ...current,
                    cardNumber: normalizeCardNumber(event.target.value),
                  }))
                }
                className="w-full border border-line bg-white px-4 py-3 text-base text-ink outline-none transition focus:border-ink"
                placeholder="4242 4242 4242 4242"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-ink" htmlFor="expiry">
                  {formatLocaleString(locale, "expiry")}
                </label>
                <input
                  id="expiry"
                  inputMode="numeric"
                  autoComplete="cc-exp"
                  value={formState.expiry}
                  onChange={(event) =>
                    setFormState((current) => ({
                      ...current,
                      expiry: normalizeExpiry(event.target.value),
                    }))
                  }
                  className="w-full border border-line bg-white px-4 py-3 text-base text-ink outline-none transition focus:border-ink"
                  placeholder="12/29"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-ink" htmlFor="cvc">
                  {formatLocaleString(locale, "cvc")}
                </label>
                <input
                  id="cvc"
                  inputMode="numeric"
                  autoComplete="cc-csc"
                  value={formState.cvc}
                  onChange={(event) =>
                    setFormState((current) => ({
                      ...current,
                      cvc: normalizeCvc(event.target.value),
                    }))
                  }
                  className="w-full border border-line bg-white px-4 py-3 text-base text-ink outline-none transition focus:border-ink"
                  placeholder="123"
                />
              </div>
            </div>

            <div className="border border-line bg-page px-4 py-4">
              <p className="text-xs uppercase tracking-[0.22em] text-ink-soft">
                {formatLocaleString(locale, "claim_code_dash")}
              </p>
              <p className="mt-2 break-all text-sm font-medium text-ink">{claimCode}</p>
            </div>

            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => {
                void handleSubmit();
              }}
              className={`inline-flex w-full items-center justify-center px-5 py-4 text-sm font-semibold ${
                isSubmitting
                  ? "bg-ink/60 text-white"
                  : "bg-ink text-white transition hover:bg-ink/90"
              }`}
            >
              {isSubmitting
                ? formatLocaleString(locale, "demo_processing")
                : formatLocaleString(locale, "demo_buy_button", { price: priceLabel })}
            </button>

            <p className="text-xs leading-6 text-ink-soft">
              {formatLocaleString(locale, "demo_mode_note")}
            </p>
          </div>

          {submitError ? (
            <div className="mt-5 border border-[#fed7aa] bg-[#fff7ed] p-4">
              <p className="text-sm font-semibold text-[#9a3412]">
                {formatLocaleString(locale, "demo_payment_failed")}
              </p>
              <p className="mt-2 text-sm leading-6 text-[#9a3412]">{submitError}</p>
            </div>
          ) : null}
        </section>
      </div>
    </main>
  );
}
