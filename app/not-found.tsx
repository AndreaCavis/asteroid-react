import Image from "next/image";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="container mx-auto p-4 flex flex-col items-center h-screen">
      <Image src={"/asteroid-icon-pink.png"} alt={"Asteroid picture"} width={250} height={250} />
      <h1 className="text-8xl font-bold mb-6">404</h1>
      <h2 className="text-4xl text-white font-normal mb-4">
        Sorry, an asteroid destroyed this page, it can't be found anymore.
      </h2>
      <br />
      <Link href={"/"} className="text-4xl underlined">
        Return to Home
      </Link>
    </div>
  );
}
