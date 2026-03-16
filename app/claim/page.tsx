type ClaimPageProps = {
  searchParams?: Promise<{
    code?: string;
  }>;
};

export default async function ClaimPage({ searchParams }: ClaimPageProps) {
  const params = (await searchParams) ?? {};
  const code = typeof params.code === "string" ? params.code : "";

  return (
    <main className="flex min-h-screen items-center justify-center bg-page px-6 py-10 text-ink">
      <div className="w-full max-w-2xl border border-line bg-white p-8 shadow-[0_30px_90px_-60px_rgba(15,23,42,0.35)]">
        <p className="text-[11px] uppercase tracking-[0.28em] text-accent">QR Ziel</p>
        <h1 className="mt-3 font-display text-4xl leading-none">EasyTerminal Demo</h1>
        <p className="mt-5 text-sm leading-7 text-ink-soft sm:text-base">
          Diese schlanke Version enthaelt bewusst nur den grossen Demo-Bildschirm. Der QR-Code ist
          bereits aktiv und uebergibt den gescannten Code hierher.
        </p>
        <div className="mt-6 border border-line bg-page-strong p-4">
          <p className="text-xs uppercase tracking-[0.24em] text-ink-soft">Gescannt</p>
          <p className="mt-2 break-all text-lg font-semibold text-ink">
            {code || "Kein Code uebergeben"}
          </p>
        </div>
      </div>
    </main>
  );
}
