// import { FaArrowLeftLong } from "react-icons/fa6";

// const ProductDetailsSkeleton = () => {
//   return (
//     <>
//       <div className="mt-4 mr-auto ml-12 text-stone-800 text-4xl animate-pulse">
//         <FaArrowLeftLong />
//       </div>
//       <div className="container mx-auto p-8 flex flex-col md:flex-row animate-pulse">
//         {/* 🖼 Image Skeleton */}
//         <div className="md:w-1/2 mb-4 md:mb-0 flex justify-center md:mr-8">
//           <div className="w-4/6 h-[400px] bg-stone-800 rounded-3xl ring-4 pink-shadow" />
//         </div>

//         {/* 📜 Text Skeleton */}
//         <div className="md:w-1/2">
//           <div className="h-10 bg-stone-800 rounded-md mb-6 w-3/4" />
//           <div className="h-8 bg-stone-800 rounded-md mb-8 w-2/3" />
//           <div className="h-6 bg-stone-800 rounded-md mb-8 w-1/2" />
//           <div className="h-8 bg-stone-800 rounded-md mb-4 w-1/4" />
//           <div className="h-6 bg-stone-800 rounded-md w-full" />
//         </div>
//       </div>
//     </>
//   );
// };

// export default ProductDetailsSkeleton;

"use client";

import { useRouter } from "next/navigation";
import { FaArrowLeftLong } from "react-icons/fa6";

const ProductDetailsSkeleton = () => {
  const router = useRouter();

  return (
    <>
      {/* Back Button */}
      <div className="flex">
        <div
          onClick={() => router.back()}
          className="mt-4 mr-auto ml-12 text-stone-500 lg:text-4xl md:text-3xl sm:text-2xl text-xl animate-pulse"
        >
          <FaArrowLeftLong />
        </div>
      </div>

      {/* Product Container */}
      <div className="container mx-auto p-8 flex flex-col lg:flex-row items-center lg:items-start">
        {/* Image Skeleton */}
        <div className="lg:w-1/2 w-full flex justify-center lg:pr-8">
          <div className="w-full lg:max-w-md md:max-w-xs sm:max-w-72 h-[400px] bg-stone-800 rounded-3xl animate-pulse"></div>
        </div>

        {/* Text Skeleton */}
        <div className="lg:w-1/2 w-full text-center lg:text-left mt-6 lg:mt-0">
          <div className="lg:h-10 md:h-8 sm:h-6 h-5 bg-stone-800 rounded-md w-1/2 mb-4 animate-pulse"></div>
          <div className="lg:h-8 md:h-6 sm:h-5 h-4 bg-stone-800 rounded-md w-2/3 mb-6 animate-pulse"></div>
          <div className="lg:h-6 md:h-5 sm:h-4 h-3 bg-stone-800 rounded-md w-1/4 mb-6 animate-pulse"></div>
          <div className="lg:h-8 md:h-6 sm:h-5 h-4 bg-stone-800 rounded-md w-1/2 mb-4 animate-pulse"></div>
          <div className="lg:h-6 md:h-5 sm:h-4 h-3 bg-stone-800 rounded-md w-3/4 animate-pulse"></div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailsSkeleton;
