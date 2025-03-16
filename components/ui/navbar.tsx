// import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="navbar-shadow fixed top-0 left-0 w-full max-h-24 bg-black z-50">
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
