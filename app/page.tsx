import { GalleryScreen } from "@/components/gallery-screen";
import { getGalleryConfig } from "@/lib/gallery-config";
import { formatLocaleString, getLocaleFromAcceptLanguage } from "@/lib/i18n";
import { getLatestGalleryPhotos } from "@/lib/photos";
import { headers } from "next/headers";
import type { GalleryPhoto } from "@/types/photo";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const locale = getLocaleFromAcceptLanguage((await headers()).get("accept-language"));
  const config = getGalleryConfig();
  let photos: GalleryPhoto[] = [];
  let skippedCount = 0;
  let error: string | undefined;

  if (!config.isSupabaseConfigured) {
    error = formatLocaleString(locale, "gallery_missing_supabase");
  } else {
    try {
      const result = await getLatestGalleryPhotos(config);
      photos = result.photos;
      skippedCount = result.skippedCount;
    } catch (caughtError) {
      error =
        caughtError instanceof Error
          ? caughtError.message
          : formatLocaleString(locale, "gallery_load_error");
    }
  }

  return <GalleryScreen locale={locale} photos={photos} skippedCount={skippedCount} error={error} />;
}
