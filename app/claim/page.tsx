import { headers } from "next/headers";
import { ClaimExperience } from "@/components/claim-experience";
import { getClaimPhotoByCode } from "@/lib/claim";
import { isMockCheckoutEnabled } from "@/lib/checkout-mode";
import { formatLocaleString, getLocaleFromAcceptLanguage } from "@/lib/i18n";

type ClaimPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function readSearchParam(value?: string | string[]) {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }

  return value ?? "";
}

export default async function ClaimPage({ searchParams }: ClaimPageProps) {
  const locale = getLocaleFromAcceptLanguage((await headers()).get("accept-language"));
  const resolvedSearchParams = (await searchParams) ?? {};
  const code = readSearchParam(resolvedSearchParams.code).trim();

  if (!code) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-page px-4 py-8 text-ink sm:px-8">
        <div className="w-full max-w-lg border border-line bg-white p-8 sm:p-10">
          <h1 className="text-3xl font-semibold tracking-[-0.03em] text-ink">
            {formatLocaleString(locale, "claim_missing_code_title")}
          </h1>
          <p className="mt-4 text-sm leading-7 text-ink-soft sm:text-base">
            {formatLocaleString(locale, "claim_missing_code_body")}
          </p>
        </div>
      </main>
    );
  }

  let photo = null;
  let loadError: string | null = null;

  try {
    photo = await getClaimPhotoByCode(code);
  } catch (error) {
    loadError =
      error instanceof Error
        ? error.message
        : formatLocaleString(locale, "claim_load_failed_title");
  }

  if (loadError) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-page px-4 py-8 text-ink sm:px-8">
        <div className="w-full max-w-lg border border-line bg-white p-8 sm:p-10">
          <p className="text-[11px] uppercase tracking-[0.28em] text-accent">
            {formatLocaleString(locale, "claim_label")}
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-ink">
            {formatLocaleString(locale, "claim_load_failed_title")}
          </h1>
          <p className="mt-4 text-sm leading-7 text-ink-soft sm:text-base">{loadError}</p>
        </div>
      </main>
    );
  }

  if (!photo) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-page px-4 py-8 text-ink sm:px-8">
        <div className="w-full max-w-lg border border-line bg-white p-8 sm:p-10">
          <p className="text-[11px] uppercase tracking-[0.28em] text-accent">
            {formatLocaleString(locale, "claim_label")}
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-ink">
            {formatLocaleString(locale, "claim_not_found_title")}
          </h1>
          <p className="mt-4 text-sm leading-7 text-ink-soft sm:text-base">
            {formatLocaleString(locale, "claim_not_found_body")}
          </p>

          <div className="mt-6 border border-line bg-page p-4">
            <p className="text-xs uppercase tracking-[0.24em] text-ink-soft">
              {formatLocaleString(locale, "claim_code_label")}
            </p>
            <p className="mt-2 break-all text-sm font-medium text-ink">{code}</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <ClaimExperience
      locale={locale}
      photo={photo}
      checkoutMode={isMockCheckoutEnabled() ? "demo" : "stripe"}
    />
  );
}
