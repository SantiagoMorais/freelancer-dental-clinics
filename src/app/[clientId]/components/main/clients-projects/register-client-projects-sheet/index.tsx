import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { RegisterClientProjectForm } from "./register-client-project-form";

export const RegisterClientProjectsSheet = () => (
  <Sheet>
    <SheetTrigger asChild>
      <Button className="mt-auto w-full max-w-96 md:w-fit">
        Registrar Projeto
      </Button>
    </SheetTrigger>
    <SheetContent className="h-full gap-0">
      <SheetHeader>
        <SheetTitle className="text-2xl uppercase">
          Registrar Projeto
        </SheetTitle>
      </SheetHeader>
      <ScrollArea className="size-full border-t px-3 py-4 pb-30">
        <RegisterClientProjectForm />
      </ScrollArea>
    </SheetContent>
  </Sheet>
);
