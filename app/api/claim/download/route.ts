import { NextResponse } from "next/server";
import { getClaimOrderByAccess, resolveClaimOrderDownloadUrl } from "@/lib/claim-orders";

export const runtime = "nodejs";

function sanitizeFileName(value: string) {
  return value.replace(/[^a-zA-Z0-9._-]+/g, "-");
}

function toAbsoluteUpstreamUrl(value: string, requestUrl: string) {
  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  return new URL(value, requestUrl).toString();
}

function readFileName(order: Awaited<ReturnType<typeof getClaimOrderByAccess>>) {
  const storagePath = order?.photo.storage_path;

  if (typeof storagePath === "string" && storagePath.trim()) {
    const normalized = storagePath.split("?")[0]?.split("#")[0] ?? storagePath;
    const fileName = normalized.split("/").pop();

    if (fileName) {
      return sanitizeFileName(fileName);
    }
  }

  const claimCode = order?.photo.resolvedClaimCode ?? order?.claim_code ?? order?.photo.id ?? "photo";
  return `${sanitizeFileName(claimCode)}.jpg`;
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const orderId = url.searchParams.get("order")?.trim();
    const token = url.searchParams.get("token")?.trim();

    if (!orderId || !token) {
      return NextResponse.json({ error: "order oder token fehlt." }, { status: 400 });
    }

    const order = await getClaimOrderByAccess(orderId, token);

    if (!order || order.status !== "paid") {
      return NextResponse.json({ error: "Download ist nicht verfuegbar." }, { status: 403 });
    }

    const downloadUrl = await resolveClaimOrderDownloadUrl(order);

    if (!downloadUrl) {
      return NextResponse.json({ error: "Bild konnte nicht geladen werden." }, { status: 404 });
    }

    const upstream = await fetch(toAbsoluteUpstreamUrl(downloadUrl, request.url), {
      cache: "no-store",
    });

    if (!upstream.ok) {
      return NextResponse.json(
        { error: "Bilddatei konnte nicht geladen werden." },
        { status: 502 },
      );
    }

    const payload = await upstream.arrayBuffer();
    const headers = new Headers();
    const fileName = readFileName(order);
    const contentType = upstream.headers.get("content-type") ?? "application/octet-stream";

    headers.set("Content-Type", contentType);
    headers.set(
      "Content-Disposition",
      `attachment; filename="${fileName}"; filename*=UTF-8''${encodeURIComponent(fileName)}`,
    );
    headers.set("Cache-Control", "private, no-store, max-age=0");
    headers.set("Content-Length", String(payload.byteLength));

    return new NextResponse(payload, {
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
