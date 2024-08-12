import type { Metadata } from "next";
import "./globals.css";
import Nav from "./components/Nav";

export const metadata: Metadata = {
  title: "Akil Job Listing",
  description: "Built for Providing a job listing site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        <Nav></Nav>
        <div className="">{children}</div>
      </body>
    </html>
  );
}
