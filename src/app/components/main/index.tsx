import { RegisterClient } from "./register-client";

export const Main = () => (
  <main className="flex w-full max-w-(--breakpoint-2xl) flex-col items-center">
    <section className="flex flex-col items-center">
      <h2>Register</h2>
      <RegisterClient />
    </section>
  </main>
);
