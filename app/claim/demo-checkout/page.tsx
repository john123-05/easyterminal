import { headers } from "next/headers";
import { DemoCheckoutExperience } from "@/components/demo-checkout-experience";
import { getClaimPhotoByCode } from "@/lib/claim";
import { isMockCheckoutEnabled } from "@/lib/checkout-mode";
import { formatLocaleString, getLocaleFromAcceptLanguage } from "@/lib/i18n";

type DemoCheckoutPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function readSearchParam(value?: string | string[]) {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }
  return value ?? "";
}

function readPriceCents(value: unknown) {
  return typeof value === "number" && value > 0 ? value : 300;
}

function readCurrency(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : "eur";
}

export default async function DemoCheckoutPage({ searchParams }: DemoCheckoutPageProps) {
  const locale = getLocaleFromAcceptLanguage((await headers()).get("accept-language"));
  const resolvedSearchParams = (await searchParams) ?? {};
  const code = readSearchParam(resolvedSearchParams.code).trim();
  const fullName = readSearchParam(resolvedSearchParams.name).trim();
  const email = readSearchParam(resolvedSearchParams.email).trim();

  if (!isMockCheckoutEnabled()) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-page px-4 py-8 text-ink sm:px-8">
        <div className="w-full max-w-lg border border-line bg-white p-8 sm:p-10">
          <h1 className="text-3xl font-semibold tracking-[-0.03em] text-ink">
            {formatLocaleString(locale, "demo_checkout_disabled_title")}
          </h1>
          <p className="mt-4 text-sm leading-7 text-ink-soft sm:text-base">
            {formatLocaleString(locale, "demo_checkout_disabled_body")}
          </p>
        </div>
      </main>
    );
  }

  if (!code) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-page px-4 py-8 text-ink sm:px-8">
        <div className="w-full max-w-lg border border-line bg-white p-8 sm:p-10">
          <h1 className="text-3xl font-semibold tracking-[-0.03em] text-ink">
            {formatLocaleString(locale, "demo_checkout_missing_code_title")}
          </h1>
          <p className="mt-4 text-sm leading-7 text-ink-soft sm:text-base">
            {formatLocaleString(locale, "demo_checkout_missing_code_body")}
          </p>
        </div>
      </main>
    );
  }

  const photo = await getClaimPhotoByCode(code);

  if (!photo) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-page px-4 py-8 text-ink sm:px-8">
        <div className="w-full max-w-lg border border-line bg-white p-8 sm:p-10">
          <h1 className="text-3xl font-semibold tracking-[-0.03em] text-ink">
            {formatLocaleString(locale, "demo_checkout_image_missing_title")}
          </h1>
          <p className="mt-4 text-sm leading-7 text-ink-soft sm:text-base">
            {formatLocaleString(locale, "demo_checkout_image_missing_body")}
          </p>
        </div>
      </main>
    );
  }

  return (
    <DemoCheckoutExperience
      locale={locale}
      claimCode={photo.resolvedClaimCode}
      photoUrl={photo.resolvedImageUrl}
      defaultName={fullName}
      email={email}
      priceCents={readPriceCents(photo.price_cents)}
      currency={readCurrency(photo.currency)}
    />
  );
}
