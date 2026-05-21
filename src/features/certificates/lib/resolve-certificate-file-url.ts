import { APP_CONFIG } from "@/constants/config";

const IMAGE_PATH_RE = /\.(png|jpe?g|webp|gif|bmp|svg)$/i;

export function resolveCertificateFileUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const base = (APP_CONFIG.apiUrl ?? "").replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function isCertificateImage(path: string): boolean {
  return IMAGE_PATH_RE.test(path);
}
