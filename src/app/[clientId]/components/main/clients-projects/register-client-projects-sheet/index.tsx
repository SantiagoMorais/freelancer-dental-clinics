import { useParams } from "next/navigation";

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

export const RegisterClientProjectsSheet = () => {
  const { clientId } = useParams<{ clientId: string }>();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="mt-auto">Registrar Projeto</Button>
      </SheetTrigger>
      <SheetContent className="h-full gap-0">
        <SheetHeader>
          <SheetTitle className="text-2xl uppercase">
            Registrar Projeto
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="size-full border-t px-3 py-4 pb-30">
          <RegisterClientProjectForm clientId={clientId} />
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
