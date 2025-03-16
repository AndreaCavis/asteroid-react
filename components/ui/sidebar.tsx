export default function Sidebar() {
  const SORT_OPTIONS = [
    { name: "None", value: "none" },
    { name: "Price: Low to High", value: "price-asc" },
    { name: "Price: High to Low", value: "price-desc" },
  ] as const;

  return (
    <div className="w-1/5 flex-none border-r-2 border-pink-800 min-h-full">
      <h1>This is the sidebar</h1>
    </div>
  );
}
