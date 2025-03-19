import { XCircle } from "lucide-react";

const EmptySearchState = ({ name }: { name: string }) => {
  return (
    <div className="relative mx-auto col-span-full lg:h-80 md:h-64 sm:h-60 h-52 bg-stone-900 rounded-md w-3/4 p-12 flex flex-col items-center justify-center">
      <XCircle className="p-2 text-red-600 lg:h-16 md:h-14 sm:h-12 h-10 lg:w-16 md:w-14 sm:w-12 w-10" />
      <h3 className="p-2 font-semibold text-[var(--accent-foreground)] lg:text-2xl md:text-lg sm:text-base text-sm">
        No products found
      </h3>
      <p className="text-stone-400 lg:text-lg md:text-base sm:text-sm text-xs text-center">
        We found no search results for <span className="text-[var(--primary)]">{name}</span>
      </p>
    </div>
  );
};

export default EmptySearchState;
