// import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="pink-shadow fixed min-h-0 max-h-24 bg-black z-50">
      <Link href={"/"}>
        <img
          src={"/asteroid-pink.png"}
          alt={"Asteroid logo"}
          width={334}
          height={100}
          className="w-1/6 h-auto m-2 inline-block duration-100 hover:opacity-75"
        />
      </Link>
    </nav>
  );
};

export default Navbar;
