import { Header } from "./components/header";
import { Main } from "./components/main";

export default function Home() {
  return (
    <section className="flex min-h-screen flex-col items-center p-4 sm:px-8">
      <Header />
      <Main />
    </section>
  );
}
