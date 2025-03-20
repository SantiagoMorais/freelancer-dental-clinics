import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { RegisterClientForm } from "./register-client-form";

export const RegisterClientSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost">Registrar Cliente</Button>
      </SheetTrigger>
      <SheetContent className="gap-0">
        <SheetHeader>
          <SheetTitle className="text-2xl uppercase">Registrar</SheetTitle>
        </SheetHeader>
        <ScrollArea className="size-full border-t px-3 py-4 pb-24">
          <RegisterClientForm />
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
