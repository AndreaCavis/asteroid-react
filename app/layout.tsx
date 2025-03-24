import type { Metadata } from "next";
import "./globals.css";
import { FiltersProvider } from "@/components/FiltersContext";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Asteroid",
  description: "Find the supplements you're looking for",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="shortcut icon" type="image/png" href="/favicon.png" />
      </head>
      <body className="min-h-screen flex flex-col">
        <title>Asteroid</title>
        <Navbar />
        <FiltersProvider>
          <div className="flex flex-1 items-stretch lg:pt-32 md:pt-24 sm:pt-16 pt-16">
            <Sidebar />
            <div className="flex-grow">{children}</div>
          </div>
        </FiltersProvider>
      </body>
    </html>
  );
}
