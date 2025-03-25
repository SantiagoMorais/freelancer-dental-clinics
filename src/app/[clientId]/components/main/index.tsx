import { TooltipProvider } from "@/components/ui/tooltip";

import { ClientsDetailsSection } from "./clients-details-section";
import { ClientsProjects } from "./clients-projects";

export const Main = () => (
  <main className="flex min-h-full w-full max-w-(--breakpoint-2xl) flex-1 flex-col gap-4 overflow-hidden p-4 md:flex-row">
    <TooltipProvider>
      <ClientsDetailsSection />
      <ClientsProjects />
    </TooltipProvider>
  </main>
);
