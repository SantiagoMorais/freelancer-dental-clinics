import { RegisterClientSheet } from "./register-client-sheet";
import { SearchClient } from "./search-client";

export const NavBar = () => (
  <nav className="flex flex-col gap-2 md:flex-row">
    <RegisterClientSheet />
    <SearchClient />
  </nav>
);
