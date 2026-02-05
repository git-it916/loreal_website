import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "L'Oréal ODORable | Luxury Olfactory Training",
  description:
    "Experience the art of scent discovery through scientific olfactory training. A premium journey combining luxury perfumes with TDI methodology.",
  keywords: [
    "L'Oréal",
    "perfume",
    "olfactory training",
    "TDI test",
    "luxury fragrance",
    "scent therapy",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-luxury-white marble-texture">
        {children}
      </body>
    </html>
  );
}
