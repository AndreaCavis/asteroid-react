export default function Searchbar() {
  return (
    <div className="flex justify-center">
      <form className="w-3/5 relative">
        <div className="relative ">
          <input type="search" placeholder="Search here" className="w-full p-4 rounded-full bg-transparent" />
        </div>
      </form>
    </div>
  );
}
