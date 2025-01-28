// import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="pink-shadow mb-6">
      <Link href={"/"}>
        <img
          src={"/asteroid-pink.png"}
          alt={"Asteroid logo"}
          width={334}
          height={100}
          // className="pb-2 pl-2 pr-5 home-logo"
          className="w-1/6 h-auto p-2 duration-500 hover:scale-105"
        />
      </Link>
    </nav>
  );
}
