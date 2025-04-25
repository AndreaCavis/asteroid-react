"use client";

import NotFoundPage from "@/app/not-found";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import React from "react";
import ProductDetailsSkeleton from "@/components/Products/ProductDetailsSkeleton";
import { Product } from "@/lib/validators/product-validator";
import ProductDetails from "@/components/Products/ProductDetails";

export const dynamic = "force-dynamic";

export default function ProductDetailsPage() {
  //{ params }: { params: { id: string } } removed for useParams()
  const params = useParams();
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!params.id) return; // prevent database call if no id is present

    const fetchProduct = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/products/${params.id}`);

        if (response.status === 404) {
          setError(true);
          return;
        }

        const data: Product = await response.json();
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(true);
      }
    };

    fetchProduct();
  }, [params.id]);

  if (error) return <NotFoundPage />;
  if (!product) return <ProductDetailsSkeleton />;

  return <ProductDetails product={product} />;
}
