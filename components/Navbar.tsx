import Link from "next/link";

const Navbar = () => {
  return (
    <nav
      className="navbar max-h-24 backdrop-blur-3xl transition-colors duration-200
                  bg-gradient-to-r from-sky-300/0 via-sky-300/0 to-sky-300/0
                  hover:bg-black/50"
    >
      <Link href={"/"}>
        <img
          src={"/asteroid-pink.png"}
          alt={"Asteroid logo"}
          width={334}
          height={100}
          className="z-50 w-1/6 h-auto m-2 inline-block transition-all hover:animate-pulse hover:duration-1000"
        />
      </Link>
    </nav>
  );
};

export default Navbar;
