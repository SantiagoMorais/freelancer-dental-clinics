import { SquarePen } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { UpdateClientStatusForm } from "./update-client-status-form";

export const UpdateClientStatusDialog = () => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="outline" className="opacity-80 hover:opacity-100">
        <SquarePen />
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Mudar status do cliente</DialogTitle>
        <DialogDescription>
          O status pode ser mudado sempre que desejar.
        </DialogDescription>
      </DialogHeader>
      <UpdateClientStatusForm />
    </DialogContent>
  </Dialog>
);
