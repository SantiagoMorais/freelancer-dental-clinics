import Link from "next/link";

import { Button } from "@/components/ui/button";

import { Logo } from "./logo";
import { NavBar } from "./nav-bar";
import { ThemeTogglerButton } from "./theme-toggler-button";

export const Header = ({ clientPage }: { clientPage?: boolean }) => (
  <header className="flex w-full max-w-(--breakpoint-2xl) flex-col items-center justify-between gap-4 md:flex-row">
    <Logo />
    {clientPage ? (
      <Link href="/">
        <Button variant="outline">Lista de clientes</Button>
      </Link>
    ) : (
      <NavBar />
    )}
    <ThemeTogglerButton />
  </header>
);
