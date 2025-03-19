import { XCircle } from "lucide-react";

const EmptySearchState = ({ name }: { name: string }) => {
  return (
    <div className="relative mx-auto col-span-full h-80 bg-stone-900 rounded-md w-3/4 p-12 flex flex-col items-center justify-center">
      <XCircle className="p-2 h-16 w-16 text-red-600" />
      <h3 className="p-2 font-semibold text-2xl text-[var(--accent-foreground)]">No products found</h3>
      <p className="text-stone-400 text-lg">
        We found no search results for <span className="text-[var(--primary)]">{name}</span>
      </p>
    </div>
  );
};

export default EmptySearchState;
