import Link from "next/link";

const Navbar = () => {
  return (
    // semi-transparent nav-bar: bg-gradient-to-b from-black via-black/90 to-black/70
    <nav
      className="navbar max-h-24 backdrop-blur-sm transition-all duration-200
                  bg-gradient-to-r from-black/30 via-black/80 to-black/90
                  hover:bg-black/90"
    >
      <Link href={"/"}>
        <img
          src={"/asteroid-pink.png"}
          alt={"Asteroid logo"}
          width={334}
          height={100}
          className="z-50 w-1/6 h-auto m-2 inline-block transition-all duration-50 hover:animate-pulse hover:duration-1000"
        />
      </Link>
    </nav>
  );
};

export default Navbar;
