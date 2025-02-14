export default function Searchbar() {
  return (
    <div className="flex justify-center">
      <form className="w-3/5 relative">
        <div className="relative ">
          <input
            type="search"
            placeholder="Search here..."
            className="w-full m-8 p-3 rounded-full bg-transparent text-white search-shadow "
          />
        </div>
      </form>
    </div>
  );
}
