const ProductDetailsSkeleton = () => {
  return (
    <div className="container mx-auto p-8 flex flex-col md:flex-row animate-pulse">
      {/* 🖼 Image Skeleton */}
      <div className="md:w-1/2 mb-4 md:mb-0 flex justify-center md:mr-8">
        <div className="w-4/6 h-[400px] bg-stone-800 rounded-3xl ring-4 pink-shadow" />
      </div>

      {/* 📜 Text Skeleton */}
      <div className="md:w-1/2">
        <div className="h-10 bg-stone-800 rounded-md mb-6 w-3/4" />
        <div className="h-8 bg-stone-800 rounded-md mb-8 w-2/3" />
        <div className="h-6 bg-stone-800 rounded-md mb-8 w-1/2" />
        <div className="h-8 bg-stone-800 rounded-md mb-4 w-1/4" />
        <div className="h-6 bg-stone-800 rounded-md w-full" />
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;
