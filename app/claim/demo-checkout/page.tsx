import { DemoCheckoutExperience } from "@/components/demo-checkout-experience";
import { getClaimPhotoByCode } from "@/lib/claim";
import { isMockCheckoutEnabled } from "@/lib/checkout-mode";

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
  const resolvedSearchParams = (await searchParams) ?? {};
  const code = readSearchParam(resolvedSearchParams.code).trim();
  const fullName = readSearchParam(resolvedSearchParams.name).trim();
  const email = readSearchParam(resolvedSearchParams.email).trim();

  if (!isMockCheckoutEnabled()) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-page px-4 py-8 text-ink sm:px-8">
        <div className="w-full max-w-lg border border-line bg-white p-8 sm:p-10">
          <h1 className="text-3xl font-semibold tracking-[-0.03em] text-ink">
            Demo-Checkout ist nicht aktiv.
          </h1>
          <p className="mt-4 text-sm leading-7 text-ink-soft sm:text-base">
            Setze `ALLOW_MOCK_CHECKOUT=true`, damit diese Test-Zahlungsseite verfuegbar ist.
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
            Kein Claim-Code gefunden.
          </h1>
          <p className="mt-4 text-sm leading-7 text-ink-soft sm:text-base">
            Oeffne diese Seite direkt ueber den Claim-Flow, damit die Demo-Zahlung geladen werden
            kann.
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
            Bild konnte nicht geladen werden.
          </h1>
          <p className="mt-4 text-sm leading-7 text-ink-soft sm:text-base">
            Fuer die Demo-Zahlung konnte kein passendes Bild zu diesem Code gefunden werden.
          </p>
        </div>
      </main>
    );
  }

  return (
    <DemoCheckoutExperience
      claimCode={photo.resolvedClaimCode}
      photoUrl={photo.resolvedImageUrl}
      defaultName={fullName}
      email={email}
      priceCents={readPriceCents(photo.price_cents)}
      currency={readCurrency(photo.currency)}
    />
  );
}
