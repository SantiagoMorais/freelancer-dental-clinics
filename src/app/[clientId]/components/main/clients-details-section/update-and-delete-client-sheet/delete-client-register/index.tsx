import { Client } from "@prisma/client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { DeleteClientForm } from "./delete-client-form";

export const DeleteClientRegister = ({
  client,
}: {
  client: Pick<Client, "companyName">;
}) => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="destructive" className="flex-1">
        Excluir Registro
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-center">
          Você tem certeza que deseja excluir os dados deste cliente?
        </DialogTitle>
        <DialogDescription>
          Essa ação não pode ser desfeita e todos os dados deste cliente, como
          seus projetos cadastrados, serão perdidos.
        </DialogDescription>
      </DialogHeader>
      <DeleteClientForm clientName={client.companyName} />
    </DialogContent>
  </Dialog>
);
