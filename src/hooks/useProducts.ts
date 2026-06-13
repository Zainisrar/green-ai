import { useQuery } from '@tanstack/react-query';

export interface ProductImage {
  alt: string;
  src: string;
}

export interface ProductKey {
  icon: {
    alt: string;
    src: string;
  };
  title: string;
  description: string;
}

export interface Product {
  id: number;
  title: string;
  slug: string;
  description: string;
  imgs: ProductImage[];
  ctaButton: {
    href: string;
    text: string;
  };
  keys: ProductKey[];
  createdAt: string;
  updatedAt: string;
}

const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch('https://g-stack.green.com.pg/api/engineering/products');
  
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  
  return response.json();
};

const fetchProductBySlug = async (slug: string): Promise<Product | null> => {
  const products = await fetchProducts();
  return products.find(product => product.slug === slug) || null;
};

export const useProducts = () => {
  return useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (updated from cacheTime)
  });
};

export const useProductBySlug = (slug: string) => {
  return useQuery<Product | null>({
    queryKey: ['product', slug],
    queryFn: () => fetchProductBySlug(slug),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (updated from cacheTime)
    enabled: !!slug, // Only run query if slug is provided
  });
};