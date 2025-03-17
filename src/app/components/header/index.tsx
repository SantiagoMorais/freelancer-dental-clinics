import { Logo } from "./logo";
import { ThemeTogglerButton } from "./theme-toggler-button";

export const Header = () => (
  <header className="flex w-full max-w-(--breakpoint-2xl) items-center justify-between">
    <Logo />
    <ThemeTogglerButton />
  </header>
);
