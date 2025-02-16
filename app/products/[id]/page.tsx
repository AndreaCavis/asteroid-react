import NotFoundPage from "@/app/not-found";
// import { useRouter } from "next/navigation"; // use-client only
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";

// REMEMBER: Modify this if you remove the ID
export default async function ProductDetailsPage({ params }: { params: { id: string } }) {
  const response = await fetch("http://localhost:3000/api/products/" + params.id);

  if (response.status === 404) {
    return <NotFoundPage />;
  }

  const product = await response.json();

  return (
    <>
      <div className="flex">
        <Link
          href="/"
          className="mt-4 mr-auto ml-12 text-white text-4xl  hover:text-current hover:scale-105 duration-300"
        >
          <FaArrowLeftLong />
        </Link>
      </div>
      <div className="container mx-auto p-8 flex flex-col md:flex-row">
        <div className="md:w-1/2 mb-4 md:mb-0 flex justify-center md:mr-8">
          <img
            src={"/" + product.imageUrl}
            alt={product.name + " image"}
            className="w-4/6 h-auto rounded-3xl ring-4 pink-shadow"
          />
        </div>
        <div className="md:w-1/2">
          <h1 className="text-5xl font-bold mb-6">{product.brand}</h1>
          <h1 className="text-3xl font-bold mb-8">{product.name}</h1>
          <p className="text-2xl text-white mb-8">${product.price}</p>
          <h3 className="text-3xl font-semibold mb-4">Suggested Use</h3>
          <p className="text-2xl text-white">{product.suggested_use}</p>
        </div>
        {/* <h1 onClick={useRouter().back} className=" m-4 text-xl underlined">
        Go back
        </h1> */}
      </div>
    </>
  );
}
