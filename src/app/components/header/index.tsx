import { NotebookPen } from "lucide-react";

export const Header = () => (
  <header className="flex w-full max-w-(--breakpoint-2xl) flex-col items-center">
    <div className="flex items-center gap-2">
      <div className="bg-primary ring-primary-foreground rounded-full p-2 ring-2">
        <NotebookPen className="size-6" />
      </div>
      <h1 className="after:from-primary-foreground after:via-primary relative to-transparent text-2xl font-semibold after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-linear-to-r">
        Freelancer Registration
      </h1>
    </div>
  </header>
);
