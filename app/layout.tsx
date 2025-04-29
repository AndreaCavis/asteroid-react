import type { Metadata } from "next";
import "./globals.css";
import { FiltersProvider } from "@/app/contexts/FiltersContext";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { Suspense } from "react";

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
        <Navbar />
        <Suspense fallback={<div>Loading...</div>}>
          <FiltersProvider>
            <div className="flex flex-1 items-stretch lg:pt-24 md:pt-20 sm:pt-16 pt-12">
              <Sidebar />
              <div className="flex-grow">{children}</div>
            </div>
          </FiltersProvider>
        </Suspense>
      </body>
    </html>
  );
}
