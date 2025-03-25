import { Toaster } from "@/components/ui/sonner";

import { Header } from "./components/header";
import { Main } from "./components/main";

const Home = () => (
  <section className="flex min-h-screen flex-col items-center gap-8 p-4 sm:px-8">
    <Header />
    <Main />
    <Toaster position="bottom-left" />
  </section>
);

export default Home;
