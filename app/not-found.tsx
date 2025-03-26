import Image from "next/image";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="flex mx-auto flex-col items-center pt-4">
      <h1 className="lg:text-8xl md:text-6xl sm:text-4xl text-2xl font-bold mb-6 hover:scale-110 duration-300 ease-in">
        404
      </h1>
      <h2 className="lg:text-4xl md:text-2xl sm:text-lg text-base text-[var(--accent-foreground)] font-normal mb-4 text-center">
        Sorry, an asteroid destroyed this page. It can't be found anymore.
      </h2>
      <Link href={"/"} className="lg:text-4xl md:text-2xl sm:text-lg text-base underlined">
        Return to Home
      </Link>
      <Image
        src={"/asteroid-icon-pink.png"}
        alt={"Asteroid picture"}
        width={256}
        height={256}
        className="lg:h-64 md:h-56 sm:h-52 h-48 lg:w-64 md:w-56 sm:w-52 w-48"
      />
    </main>
  );
}
