import { RegisterClientSheet } from "./register-client";

export const Main = () => (
  <main className="flex w-full max-w-(--breakpoint-2xl) flex-col items-center">
    <section className="flex flex-col items-center gap-2">
      <div className="flex flex-wrap gap-2">
        <RegisterClientSheet />
      </div>
    </section>
  </main>
);
