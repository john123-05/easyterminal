export type PhotoRecord = {
  id: string;
  park_id?: string | null;
  storage_bucket?: string | null;
  storage_path?: string | null;
  image_url?: string | null;
  thumbnail_url?: string | null;
  created_at?: string | null;
  external_code?: string | null;
  claim_code?: string | null;
  [key: string]: unknown;
};

export type GalleryPhoto = PhotoRecord & {
  resolvedImageUrl: string;
  resolvedClaimCode: string;
};

