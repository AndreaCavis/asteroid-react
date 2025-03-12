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
      <body className="dark">
        <title>Asteroid</title>
        <Navbar />
        <Sidebar />
        <div className="pt-28 dark">{children}</div>
      </body>
    </html>
  );
}
