import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const firaMono = localFont({
  src: "../../public/fonts/fira-mono-v14-latin-regular.woff2",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Mateusz Urbanek Portfolio",
  description: "Mateusz Urbanek Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={firaMono.className}>
        {children}
      </body>
    </html>
  );
}