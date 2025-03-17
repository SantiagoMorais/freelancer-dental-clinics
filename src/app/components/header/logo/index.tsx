import { NotebookPen } from "lucide-react";

export const Logo = () => (
  <section className="flex items-center gap-2">
    <div className="rounded-lg p-1.5 ring-2">
      <NotebookPen className="size-6" />
    </div>
    <h1 className="relative to-transparent text-xl leading-tight font-semibold tracking-wide">
      Registro <br />
      Freelancer
    </h1>
  </section>
);
