import type { Product } from "../../../hooks/useProducts";

export type ProductBrand = "sunshine" | "empawa" | "sunsmart";

export const productBrands = {
  sunshine: {
    name: "GREEN SunShine",
    nodeId: "7077:12660",
  },
  empawa: {
    name: "GREEN Em’Pawa",
    nodeId: "7077:25663",
  },
  sunsmart: {
    name: "GREEN SunSmart",
    nodeId: "7077:26900",
  },
} as const;

export function getProductModel(product: Product) {
  return product.description.match(/\bGL-[A-Z0-9]+-[A-Z0-9.-]+/)?.[0];
}

// The CMS has no brand field. These model families are defined in the catalogue.
export function getProductBrand(product: Product): ProductBrand | undefined {
  const model = getProductModel(product);
  if (model?.startsWith("GL-SS-")) return "sunshine";
  if (model?.startsWith("GL-EM-IPS-")) return "empawa";
  if (model?.startsWith("GL-EM-")) return "sunsmart";
}

export function getBrandGallery(products: Product[], brand: ProductBrand) {
  return products
    .filter((product) => getProductBrand(product) === brand)
    .flatMap((product) =>
      product.imgs
        .filter((image) => image.src)
        .map((image, index) => ({
          id: `${product.id}-${index}`,
          product,
          image,
        })),
    );
}
