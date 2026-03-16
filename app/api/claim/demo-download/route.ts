import { NextResponse } from "next/server";
import { getClaimPhotoByCode } from "@/lib/claim";
import { resolvePhotoDownloadUrl } from "@/lib/images";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

function sanitizeFileName(value: string) {
  return value.replace(/[^a-zA-Z0-9._-]+/g, "-");
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const code = url.searchParams.get("code")?.trim();

    if (!code) {
      return NextResponse.json({ error: "code fehlt." }, { status: 400 });
    }

    const photo = await getClaimPhotoByCode(code);

    if (!photo) {
      return NextResponse.json({ error: "Bild konnte nicht geladen werden." }, { status: 404 });
    }

    const supabase = getSupabaseAdminClient();
    const downloadUrl = await resolvePhotoDownloadUrl(photo, supabase);

    if (!downloadUrl) {
      return NextResponse.json({ error: "Download ist nicht verfügbar." }, { status: 404 });
    }

    const upstream = await fetch(downloadUrl, {
      cache: "no-store",
    });

    if (!upstream.ok || !upstream.body) {
      return NextResponse.json(
        { error: "Bilddatei konnte nicht geladen werden." },
        { status: 502 },
      );
    }

    const headers = new Headers();
    const contentType = upstream.headers.get("content-type") ?? "application/octet-stream";
    const contentLength = upstream.headers.get("content-length");
    const fileName = sanitizeFileName(`${photo.resolvedClaimCode || photo.id}.jpg`);

    headers.set("Content-Type", contentType);
    headers.set(
      "Content-Disposition",
      `attachment; filename="${fileName}"; filename*=UTF-8''${encodeURIComponent(fileName)}`,
    );
    headers.set("Cache-Control", "private, no-store, max-age=0");

    if (contentLength) {
      headers.set("Content-Length", contentLength);
    }

    return new NextResponse(upstream.body, {
      status: 200,
      headers,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Download konnte nicht gestartet werden.",
      },
      { status: 500 },
    );
  }
}
