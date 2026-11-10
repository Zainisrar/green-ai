import type { ProductKey } from "../../../hooks/useProducts";

/** The CMS owns the icon asset and its alternative text. */
export default function SpecificationIcon({
  feature,
}: {
  feature: ProductKey;
}) {
  if (!feature.icon?.src) return null;
  return (
    <img
      loading="lazy"
      decoding="async"
      src={feature.icon.src}
      alt={feature.icon.alt || ""}
    />
  );
}
