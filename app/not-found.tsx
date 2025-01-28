import Image from "next/image";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <>
      <h1>404</h1>
      <Image src={"/asteroid_icon_pink.png"} alt={"Asteroid picture"} width={300} height={3000} />
      <h2>Sorry, an asteroid destroyed this page, it can't be found anymore.</h2>
      <br />
      <Link href={"/"}>
        <u>Return to Home</u>
      </Link>
    </>
  );
}
