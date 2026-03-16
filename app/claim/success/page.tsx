import { headers } from "next/headers";
import { ClaimSuccessExperience } from "@/components/claim-success-experience";
import { formatLocaleString, getLocaleFromAcceptLanguage } from "@/lib/i18n";

type ClaimSuccessPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function readSearchParam(value?: string | string[]) {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }

  return value ?? "";
}

export default async function ClaimSuccessPage({ searchParams }: ClaimSuccessPageProps) {
  const locale = getLocaleFromAcceptLanguage((await headers()).get("accept-language"));
  const resolvedSearchParams = (await searchParams) ?? {};
  const sessionId = readSearchParam(resolvedSearchParams.session_id).trim();
  const orderId = readSearchParam(resolvedSearchParams.order).trim();
  const token = readSearchParam(resolvedSearchParams.token).trim();

  if (!sessionId && (!orderId || !token)) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-page px-4 py-8 text-ink sm:px-8">
        <div className="w-full max-w-lg border border-line bg-white p-8 sm:p-10">
          <h1 className="text-3xl font-semibold tracking-[-0.03em] text-ink">
            {formatLocaleString(locale, "success_missing_title")}
          </h1>
          <p className="mt-4 text-sm leading-7 text-ink-soft sm:text-base">
            {formatLocaleString(locale, "success_missing_body")}
          </p>
        </div>
      </main>
    );
  }

  return (
    <ClaimSuccessExperience
      locale={locale}
      sessionId={sessionId || undefined}
      orderId={orderId || undefined}
      token={token || undefined}
    />
  );
}
