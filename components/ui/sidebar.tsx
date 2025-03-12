export default function Sidebar() {
  const SORT_OPTIONS = [
    { name: "None", value: "none" },
    { name: "Price: Low to High", value: "price-asc" },
    { name: "Price: High to Low", value: "price-desc" },
  ] as const;

  return (
    <div className="flex w-1/4 bg-stone-800 h-full">
      <h1>This is the sidebar</h1>
    </div>
  );
}
