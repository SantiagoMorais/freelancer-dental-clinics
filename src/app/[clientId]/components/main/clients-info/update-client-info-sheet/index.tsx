import { Client } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { UpdateClientInfoForm } from "./update-client-info-form";

export const UpdateClientInfoSheet = ({ client }: { client: Client }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="mt-auto flex-1">Editar informações</Button>
      </SheetTrigger>
      <SheetContent className="gap-0">
        <SheetHeader>
          <SheetTitle className="text-2xl uppercase">Editar Dados</SheetTitle>
        </SheetHeader>
        <ScrollArea className="size-full border-t px-3 py-4 pb-30">
          <UpdateClientInfoForm client={client} />
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
