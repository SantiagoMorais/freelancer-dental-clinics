import { Loader2 } from "lucide-react";

import { IConfirmAndCancelButtonsProps } from "@/core/interfaces/confirm-and-cancel-button-props";

import { Button } from "./ui/button";
import { DialogClose } from "./ui/dialog";

export const ConfirmAndCancelButtons = ({
  onClickFunction,
  isLoading,
  colors,
}: IConfirmAndCancelButtonsProps) => (
  <div className="flex w-full flex-wrap items-center gap-4">
    <DialogClose asChild>
      <Button
        className="flex-1"
        disabled={isLoading}
        variant={colors === "primary" ? "destructive" : "secondary"}
      >
        Cancelar
      </Button>
    </DialogClose>
    <Button
      variant={colors === "primary" ? "default" : "destructive"}
      disabled={isLoading}
      onClick={() => onClickFunction && onClickFunction()}
      className="flex-1"
    >
      {isLoading ? <Loader2 className="animate-spin" /> : "Confirmar"}
    </Button>
  </div>
);
