// import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="pink-shadow fixed min-h-0 max-h-20 bg-black z-50">
      <Link href={"/"}>
        <img
          src={"/asteroid-pink.png"}
          alt={"Asteroid logo"}
          width={334}
          height={100}
          className="w-1/6 h-auto p-2 duration-500 hover:scale-105"
        />
      </Link>
    </nav>
  );
}
