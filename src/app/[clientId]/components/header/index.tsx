import Link from "next/link";

import { Logo } from "@/app/components/header/logo";
import { ThemeTogglerButton } from "@/app/components/header/theme-toggler-button";
import { Button } from "@/components/ui/button";

export const Header = () => (
  <header className="flex w-full max-w-(--breakpoint-2xl) items-center justify-between">
    <Logo />
    <Link href="/">
      <Button variant="outline">Lista de clientes</Button>
    </Link>
    <ThemeTogglerButton />
  </header>
);
