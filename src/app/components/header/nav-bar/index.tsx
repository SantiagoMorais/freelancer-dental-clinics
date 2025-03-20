import { RegisterClientSheet } from "./register-client";
import { SearchClient } from "./search-client";

export const NavBar = () => (
  <nav className="flex flex-wrap gap-2">
    <RegisterClientSheet />
    <SearchClient />
  </nav>
);
