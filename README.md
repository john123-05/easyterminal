# EasyTerminal Demo

Eigenstaendige Next.js-Demo fuer den EasyTerminal-Bildschirm:

- Bilder laufen in zwei Reihen horizontal durch
- Intro-Popup erklaert den Demo-Ablauf
- QR-Code wird pro Bild erzeugt
- QR-Code fuehrt in den echten Claim-Flow
- Demo-Zahlung und Stripe-Checkout sind enthalten
- Wenn heute keine Bilder vorhanden sind, wird automatisch der letzte verfuegbare Tag geladen

## Setup

1. Dependencies installieren

```bash
npm install
```

2. Environment anlegen

```bash
cp .env.example .env.local
```

3. Werte in `.env.local` setzen

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
ALLOW_MOCK_CHECKOUT=true
NEXT_PUBLIC_GALLERY_LIMIT=180
NEXT_PUBLIC_GALLERY_PARK_ID=
NEXT_PUBLIC_GALLERY_BUCKET=test
NEXT_PUBLIC_GALLERY_ONLY_TODAY=true
GALLERY_TIMEZONE=Europe/Berlin
```

4. Development starten

```bash
npm run dev
```

## Routen

- `/`: Bildschirm-Demo mit Intro-Popup
- `/demo`: alternative Demo-Route
- `/claim?code=...`: Claim-Flow fuer gescannte QR-Codes
- `/claim/demo-checkout`: Demo-Zahlung bei `ALLOW_MOCK_CHECKOUT=true`
- `/claim/success`: Success-Seite fuer Demo oder Stripe

## Wichtige Hinweise

- Fuer die Demo-Zahlungsmaske muss `ALLOW_MOCK_CHECKOUT=true` gesetzt sein.
- Fuer echten Stripe-Test-Checkout werden `STRIPE_SECRET_KEY` und `STRIPE_WEBHOOK_SECRET` benoetigt.
- Die Tabelle `claim_orders` wird vorausgesetzt. Die SQL-Datei liegt unter `supabase/migrations/20260313_create_claim_orders.sql`.
