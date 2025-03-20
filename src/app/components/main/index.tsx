import { ClientsList } from "./clients-list";

export const Main = () => (
  <main className="flex size-full max-w-(--breakpoint-2xl) flex-1 flex-col items-center">
    <section className="flex size-full flex-1 flex-col items-center gap-2">
      <ClientsList />
    </section>
  </main>
);
