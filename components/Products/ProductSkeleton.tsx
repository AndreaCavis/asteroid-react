const ProductSkeleton = () => {
  return (
    <div className="bg-none rounded-md w-52 animate-pulse">
      {/* Image Skeleton */}
      <div className="flex justify-center h-52 w-52 bg-stone-800 rounded-md" />

      {/* Text Skeleton */}
      <div className="w-52 p-2">
        <div className="h-6 bg-stone-800 rounded-md mb-2 w-3/4" />
        <div className="h-4 bg-stone-800 rounded-md mb-1 w-2/3" />
        <div className="h-4 bg-stone-800 rounded-md w-1/2" />
      </div>
    </div>
  );
};

export default ProductSkeleton;
