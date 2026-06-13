"use client";
import React from "react";
import Link from "next/link";
import { useProducts } from "../../../hooks/useProducts";
import TopNavigation from "@/app/components/TopNavigation/TopNavigation";

const ProductsPage = () => {
  const { data: products } = useProducts();

  if (!products) {
    return null;
  }

  return (
    <>
    <TopNavigation/>
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 ml-20">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products?.map((product) => (
          <Link
            key={product.id}
            href={`/engineering/products/${product.slug}`}
            className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
          >
            <div className="mb-4">
              {product.imgs?.[0] && (
                <img
                  src={product.imgs[0].src}
                  alt={product.imgs[0].alt || product.title}
                  className="w-full h-48 object-cover rounded-md"
                />
              )}
            </div>
            <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
            <p className="text-gray-600 text-sm line-clamp-3">
              {product.description}
            </p>
            <div className="mt-4">
              <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                View Details
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
    </>
  );
};

export default ProductsPage;