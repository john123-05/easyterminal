# EasyTerminal Demo

Eigenstaendige Next.js-Demo fuer den EasyTerminal-Bildschirm:

- Bilder laufen in zwei Reihen horizontal durch
- Intro-Popup erklaert den Demo-Ablauf
- QR-Code wird pro Bild erzeugt
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
NEXT_PUBLIC_SITE_URL=http://localhost:3000
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
- `/claim?code=...`: einfacher Platzhalter fuer gescannte QR-Codes

