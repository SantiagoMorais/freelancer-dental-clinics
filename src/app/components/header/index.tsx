import { Logo } from "./logo";
import { NavBar } from "./nav-bar";

export const Header = () => (
  <header className="flex w-full max-w-(--breakpoint-2xl) items-center justify-between">
    <Logo />
    <NavBar />
  </header>
);
