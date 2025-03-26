import "./globals.css";

import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

import { ClientsProvider } from "@/contexts/clients-context";
import { SearchClientsMethodsProvider } from "@/contexts/search-clients-methods-context";
import { ThemeTogglerProvider } from "@/contexts/theme-toggler-content";

import { Providers } from "../components/providers";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Registro Freelancer",
  description:
    "Aplicação para registro de clientes com o objetivo de desenvolver projetos freelancer para melhor organização e administração.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} antialiased`}>
        <Providers>
          <ClientsProvider>
            <SearchClientsMethodsProvider>
              <ThemeTogglerProvider>{children}</ThemeTogglerProvider>
            </SearchClientsMethodsProvider>
          </ClientsProvider>
        </Providers>
      </body>
    </html>
  );
}
