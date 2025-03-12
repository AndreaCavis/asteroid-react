import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/navbar";

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
    <html lang="en">
      <body>
        <title>Asteroid</title>
        <Navbar />
        <div className="pt-28">{children}</div>
      </body>
    </html>
  );
}
