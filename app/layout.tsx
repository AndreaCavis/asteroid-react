import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/ui/navbar";
import Sidebar from "../components/ui/sidebar";

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
      <body className="min-h-screen flex flex-col">
        <title>Asteroid</title>
        <Navbar />
        <div className="flex flex-1 items-stretch pt-28 min-h-screen">
          <Sidebar />
          <div className="flex-grow">{children}</div>
        </div>
      </body>
    </html>
  );
}
