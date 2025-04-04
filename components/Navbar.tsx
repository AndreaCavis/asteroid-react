import Link from "next/link";

const Navbar = () => {
  return (
    // semi-transparent nav-bar: bg-gradient-to-b from-black via-black/90 to-black/70
    <nav className="navbar-shadow top-0 left-0 w-full max-h-24 backdrop-blur-sm bg-gradient-to-b from-black/50 via-black/60 to-black/50">
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
