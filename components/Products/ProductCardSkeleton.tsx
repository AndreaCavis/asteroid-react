const ProductSkeleton = () => {
  return (
    <div className="bg-none rounded-md lg:w-52 md:w-44 sm:w-32 w-24 animate-pulse">
      {/* Image Skeleton */}
      <div className="flex justify-center bg-stone-800 rounded-md lg:w-52 lg:h-52 md:w-44 md:h-44 sm:w-32 sm:h-32 w-24 h-24" />

      {/* Text Skeleton */}
      <div className="lg:w-52 md:w-44 sm:w-32 w-24 p-2">
        <div className="h-6 bg-stone-800 rounded-md mb-2 w-3/4" />
        <div className="h-4 bg-stone-800 rounded-md mb-1 w-2/3" />
        <div className="h-4 bg-stone-800 rounded-md w-1/2" />
      </div>
    </div>
  );
};
