import "./globals.css";

import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

import { ThemeTogglerProvider } from "@/contexts/theme-toggler-content";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} antialiased`}>
        <ThemeTogglerProvider>{children}</ThemeTogglerProvider>
      </body>
    </html>
  );
}
