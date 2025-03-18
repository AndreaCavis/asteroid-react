import Image from "next/image";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="container mx-auto flex flex-col items-center h-screen">
      <h1 className="text-8xl font-bold mb-6 hover:scale-110 duration-300 ease-in">404</h1>
      <h2 className="text-4xl text-[var(--accent-foreground)] font-normal mb-4">
        Sorry, an asteroid destroyed this page. It can't be found anymore.
      </h2>
      <Link href={"/"} className="text-4xl underlined">
        Return to Home
      </Link>
      <Image src={"/asteroid-icon-pink.png"} alt={"Asteroid picture"} width={250} height={250} />
    </div>
  );
}
