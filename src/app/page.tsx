import { Header } from "./components/header";
import { Main } from "./components/main";

export default function Home() {
  return (
    <section className="flex flex-col items-center p-4 px-8">
      <Header />
      <Main />
    </section>
  );
}
