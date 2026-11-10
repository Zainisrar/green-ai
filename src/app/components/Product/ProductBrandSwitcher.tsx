import Link from "next/link";
import styles from "./ProductsFigma.module.css";

const productBrands = [
  {
    name: "GREEN SunShine",
    href: "/engineering/products/green-sunshine",
  },
  {
    name: "GREEN Em’Pawa",
    href: "/engineering/products/green-em-pawa",
  },
  {
    name: "GREEN SunSmart",
    href: "/engineering/products/green-sunsmart",
  },
] as const;

/** The active brand appears first in each Figma frame's category stack. */
export default function ProductBrandSwitcher({
  current,
}: {
  current: (typeof productBrands)[number]["name"];
}) {
  return (
    <nav className={styles.productBrandSwitcher} aria-label="Product ranges">
      {[...productBrands]
        .sort((a, b) => Number(b.name === current) - Number(a.name === current))
        .map((brand, index) => (
          <Link
            key={brand.href}
            href={brand.href}
            className={
              styles[
                ["primaryBrandLink", "secondaryBrandLink", "tertiaryBrandLink"][
                  index
                ]
              ]
            }
            aria-label={`View ${brand.name} products`}
            aria-current={brand.name === current ? "page" : undefined}
          />
        ))}
    </nav>
  );
}
