import { headers } from "next/headers";
import { DemoSuccessExperience } from "@/components/demo-success-experience";
import { getClaimPhotoByCode } from "@/lib/claim";
import { isMockCheckoutEnabled } from "@/lib/checkout-mode";
import { formatLocaleString, getLocaleFromAcceptLanguage } from "@/lib/i18n";

type DemoSuccessPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function readSearchParam(value?: string | string[]) {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }
  return value ?? "";
}

export default async function DemoSuccessPage({ searchParams }: DemoSuccessPageProps) {
  const locale = getLocaleFromAcceptLanguage((await headers()).get("accept-language"));
  const resolvedSearchParams = (await searchParams) ?? {};
  const code = readSearchParam(resolvedSearchParams.code).trim();

  if (!isMockCheckoutEnabled()) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-page px-4 py-8 text-ink sm:px-8">
        <div className="w-full max-w-lg border border-line bg-white p-8 sm:p-10">
          <h1 className="text-3xl font-semibold tracking-[-0.03em] text-ink">
            {formatLocaleString(locale, "demo_success_disabled_title")}
          </h1>
          <p className="mt-4 text-sm leading-7 text-ink-soft sm:text-base">
            {formatLocaleString(locale, "demo_success_disabled_body")}
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
            {formatLocaleString(locale, "demo_success_missing_code_title")}
          </h1>
          <p className="mt-4 text-sm leading-7 text-ink-soft sm:text-base">
            {formatLocaleString(locale, "demo_success_missing_code_body")}
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
            {formatLocaleString(locale, "demo_success_image_missing_title")}
          </h1>
          <p className="mt-4 text-sm leading-7 text-ink-soft sm:text-base">
            {formatLocaleString(locale, "demo_success_image_missing_body")}
          </p>
        </div>
      </main>
    );
  }

  return (
    <DemoSuccessExperience
      locale={locale}
      photoUrl={photo.resolvedImageUrl}
      claimCode={photo.resolvedClaimCode}
    />
  );
}
