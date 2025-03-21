"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Client } from "@prisma/client";
import { AlertDialogTitle } from "@radix-ui/react-alert-dialog";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { FormFields } from "@/app/components/header/nav-bar/register-client-sheet/register-client-form/form-fields";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Toaster } from "@/components/ui/sonner";
import {
  formRegisterClientSchema,
  TFormRegisterClientSchema,
} from "@/core/types/form-register-client-schema";
import { updateClientInfoDefaultValues } from "@/utils/update-client-info-default-values";
import { updateClientOnSubmitForm } from "@/utils/update-client-on-submit-form";

export const UpdateClientInfoForm = ({ client }: { client: Client }) => {
  const queryClient = useQueryClient();
  const [buttonAction, setButtonAction] = useState<{
    text: string;
    disabled: boolean;
  }>({ text: "Editar dados", disabled: false });
  const [isLoading, setIsLoading] = useState(false);
  const [processingZipCode, setProcessingZipCode] = useState(false);

  const defaultValues = async () =>
    await updateClientInfoDefaultValues({ client });

  const form = useForm<TFormRegisterClientSchema>({
    resolver: zodResolver(formRegisterClientSchema),
    shouldUnregister: true,
    defaultValues: async () => await defaultValues(),
  });

  const onSubmit = async (data: TFormRegisterClientSchema) => {
    await updateClientOnSubmitForm({ clientId: client.id, data, setIsLoading });
    queryClient.invalidateQueries({ queryKey: ["clientDetails"] });
  };

  const onError = () => {
    setButtonAction({ text: "Revise os campos", disabled: true });

    setTimeout(() => {
      setButtonAction({ text: "Editar dados", disabled: false });
    }, 3000); // Get back to normal after 3 seconds
  };

  return (
    <Form {...form}>
      {processingZipCode && (
        <AlertDialog open>
          <AlertDialogContent className="flex flex-col items-center gap-4">
            <AlertDialogTitle className="text-2xl font-bold uppercase">
              Carregando Endereço
            </AlertDialogTitle>
            <AlertDialogDescription>
              <Loader2 className="size-16 animate-spin" />
            </AlertDialogDescription>
          </AlertDialogContent>
        </AlertDialog>
      )}
      <Toaster position="bottom-left" />
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className="flex flex-col items-center gap-8 px-1"
      >
        <FormFields form={form} setProcessingZipCode={setProcessingZipCode} />
        <Button
          type="submit"
          variant="destructive"
          className="w-full text-xl font-semibold md:w-fit"
          disabled={isLoading || buttonAction.disabled}
        >
          <Loader2 className={`animate-spin ${!isLoading && "hidden"}`} />
          <span className="md:px-3">
            {isLoading ? "Processando..." : buttonAction.text}
          </span>
        </Button>
      </form>
    </Form>
  );
};
