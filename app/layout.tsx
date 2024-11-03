import "@/app/globals.css";
import { Navbar } from "@/components/ui/navbar";
import type { Metadata } from "next";
import { Orbitron, Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
  weight: ["400", "500", "700", "900"],
});

const orbitron = Orbitron({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-orbitron",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "qARCade",
  description: "qARCade",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${orbitron.variable} antialiased`}>
        <Navbar className="top-2" />
        {children}
      </body>
    </html>
  );
}
