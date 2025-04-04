import Link from "next/link";

const Navbar = () => {
  return (
    // semi-transparent nav-bar: bg-gradient-to-b from-black via-black/90 to-black/70
    <nav className="navbar-shadow max-h-24 backdrop-blur-sm bg-gradient-to-b from-black/60 via-black/40 to-black/60 hover:bg-black/90 transition-all ease-in duration-200">
      <Link href={"/"}>
        <img
          src={"/asteroid-pink.png"}
          alt={"Asteroid logo"}
          width={334}
          height={100}
          className="w-1/6 h-auto m-2 inline-block duration-200 hover:opacity-75"
        />
      </Link>
    </nav>
  );
};

export default Navbar;
