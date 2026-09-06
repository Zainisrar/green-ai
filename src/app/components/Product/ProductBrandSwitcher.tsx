import Link from "next/link";
import styles from "./ProductsFigma.module.css";

const productBrands = [
  {
    name: "GREEN SunShine",
    href: "/engineering/products/green-sunshine",
    className: "sunshineBrandLink",
  },
  {
    name: "GREEN Em’Pawa",
    href: "/engineering/products/green-em-pawa",
    className: "empawaBrandLink",
  },
  {
    name: "GREEN SunSmart",
    href: "/engineering/products/green-sunsmart",
    className: "sunsmartBrandLink",
  },
] as const;

/** Click targets for the product marks embedded in the Figma background. */
export default function ProductBrandSwitcher({
  current,
}: {
  current: (typeof productBrands)[number]["name"];
}) {
  return (
    <nav className={styles.productBrandSwitcher} aria-label="Product ranges">
      {productBrands.map((brand) => (
        <Link
          key={brand.href}
          href={brand.href}
          className={styles[brand.className]}
          aria-label={`View ${brand.name} products`}
          aria-current={brand.name === current ? "page" : undefined}
        />
      ))}
    </nav>
  );
}
