import { ClientsList } from "./clients-list";
import { RegisterClientSheet } from "./register-client";

export const Main = () => (
  <main className="flex size-full max-w-(--breakpoint-2xl) flex-1 flex-col items-center">
    <section className="flex size-full flex-1 flex-col items-center gap-2">
      <div className="flex flex-wrap gap-2">
        <RegisterClientSheet />
      </div>
      <ClientsList />
    </section>
  </main>
);
