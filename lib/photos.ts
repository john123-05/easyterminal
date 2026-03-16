import "server-only";
import { getDayRangeForTimeZone, getTodayRangeForTimeZone } from "@/lib/date-range";
import { getGalleryConfig, type GalleryConfig } from "@/lib/gallery-config";
import { resolvePhotoImageUrl } from "@/lib/images";
import { resolvePhotoClaimCode } from "@/lib/qr";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import type { GalleryPhoto, PhotoRecord } from "@/types/photo";

type GalleryPhotoResult = {
  photos: GalleryPhoto[];
  skippedCount: number;
};

function hasPhotoId(value: unknown): value is PhotoRecord {
  return Boolean(
    value &&
      typeof value === "object" &&
      "id" in value &&
      typeof (value as { id?: unknown }).id === "string",
  );
}

function buildPhotoQuery(
  config: GalleryConfig,
  supabase: ReturnType<typeof getSupabaseServerClient>,
) {
  let query = supabase
    .from("photos")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(config.limit);

  if (config.parkId) {
    query = query.eq("park_id", config.parkId);
  }

  if (config.storageBucket) {
    query = query.eq("storage_bucket", config.storageBucket);
  }

  return query;
}

async function fetchLatestPhotoCreatedAt(
  config: GalleryConfig,
  supabase: ReturnType<typeof getSupabaseServerClient>,
) {
  let query = supabase
    .from("photos")
    .select("created_at")
    .order("created_at", { ascending: false })
    .limit(1);

  if (config.parkId) {
    query = query.eq("park_id", config.parkId);
  }

  if (config.storageBucket) {
    query = query.eq("storage_bucket", config.storageBucket);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(`Supabase-Query auf \`photos\` fehlgeschlagen: ${error.message}`);
  }

  const createdAt = data?.[0]?.created_at;
  return typeof createdAt === "string" ? createdAt : null;
}

export async function getLatestGalleryPhotos(
  config: GalleryConfig = getGalleryConfig(),
): Promise<GalleryPhotoResult> {
  const supabase = getSupabaseServerClient();
  const todayRange = config.onlyToday ? getTodayRangeForTimeZone(config.timeZone) : null;
  let query = buildPhotoQuery(config, supabase);

  if (todayRange) {
    query = query.gte("created_at", todayRange.startIso).lt("created_at", todayRange.endIso);
  }

  const { data: initialData, error } = await query;
  let data = initialData;

  if (error) {
    throw new Error(`Supabase-Query auf \`photos\` fehlgeschlagen: ${error.message}`);
  }

  if (config.onlyToday && (data?.length ?? 0) === 0) {
    const latestCreatedAt = await fetchLatestPhotoCreatedAt(config, supabase);

    if (latestCreatedAt) {
      const fallbackRange = getDayRangeForTimeZone(config.timeZone, new Date(latestCreatedAt));
      const fallbackQuery = buildPhotoQuery(config, supabase)
        .gte("created_at", fallbackRange.startIso)
        .lt("created_at", fallbackRange.endIso);

      const fallbackResult = await fallbackQuery;

      if (fallbackResult.error) {
        throw new Error(
          `Supabase-Query auf \`photos\` fehlgeschlagen: ${fallbackResult.error.message}`,
        );
      }

      data = fallbackResult.data;
    }
  }

  const rows = (data ?? []).filter(hasPhotoId);
  const photos = rows.reduce<GalleryPhoto[]>((collection, row) => {
    const resolvedImageUrl = resolvePhotoImageUrl(row, supabase);

    if (!resolvedImageUrl) {
      return collection;
    }

    collection.push({
      ...row,
      resolvedImageUrl,
      resolvedClaimCode: resolvePhotoClaimCode(row),
    });

    return collection;
  }, []);

  return {
    photos,
    skippedCount: rows.length - photos.length,
  };
}

