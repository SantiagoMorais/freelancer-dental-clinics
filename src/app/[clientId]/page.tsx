import { Header } from "./components/header";
import { Main } from "./components/main";

const ClientDetailsPage = () => (
  <section className="flex min-h-screen flex-col items-center gap-8 p-4 sm:px-8 md:max-h-screen">
    <Header />
    <Main />
  </section>
);

export default ClientDetailsPage;
