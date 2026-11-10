import styles from "./ProductsFigma.module.css";
import type { getBrandGallery } from "./productCatalog";

const PAGE_SIZE = 4;

interface ProductThumbnailsProps {
  items: ReturnType<typeof getBrandGallery>;
  active: number;
  onSelect: (index: number) => void;
  mobile?: boolean;
}

export default function ProductThumbnails({
  items,
  active,
  onSelect,
  mobile = false,
}: ProductThumbnailsProps) {
  const start = Math.floor(active / PAGE_SIZE) * PAGE_SIZE;

  return (
    <div
      className={mobile ? styles.mobileGalleryControls : styles.galleryControls}
    >
      {start > 0 && (
        <button
          type="button"
          className={styles.previousProducts}
          aria-label="Previous products"
          onClick={() => onSelect(start - PAGE_SIZE)}
        >
          ‹
        </button>
      )}
      <div className={mobile ? styles.mobileThumbnails : styles.thumbnails}>
        {items.slice(start, start + PAGE_SIZE).map((item, offset) => {
          const index = start + offset;
          const label = `${item.product.title} (${item.product.description.split("\n")[0]})`;

          return (
            <button
              key={item.id}
              type="button"
              className={
                active === index
                  ? styles.activeThumbnail
                  : styles.inactiveThumbnail
              }
              onClick={() => onSelect(index)}
              aria-label={`Show ${label}`}
              aria-pressed={active === index}
              title={label}
            >
              <img
                loading="lazy"
                decoding="async"
                src={item.image.src}
                alt={item.image.alt || label}
              />
            </button>
          );
        })}
      </div>
      {start + PAGE_SIZE < items.length && (
        <button
          type="button"
          className={styles.nextProducts}
          aria-label="Next products"
          onClick={() => onSelect(start + PAGE_SIZE)}
        >
          ›
        </button>
      )}
    </div>
  );
}
