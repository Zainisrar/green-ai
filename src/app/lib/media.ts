const API_ORIGIN = "https://g-stack.green.com.pg";

export function resolveApiAssetUrl(src?: string | null): string | undefined {
  if (!src) return undefined;
  const trimmed = src.trim();
  if (!trimmed) return undefined;
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }
  if (trimmed.startsWith("/")) {
    return `${API_ORIGIN}${trimmed}`;
  }
  return `${API_ORIGIN}/${trimmed}`;
}
