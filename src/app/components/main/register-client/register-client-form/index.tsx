"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertDialogTitle } from "@radix-ui/react-alert-dialog";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

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
import { registerClientOnSubmitForm } from "@/utils/register-client-on-submit-form";
import { useFormDefaultValues } from "@/utils/use-form-default-values";

import { FormFields } from "./form-fields";

export const RegisterClientForm = () => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [processingZipCode, setProcessingZipCode] = useState(false);

  const form = useForm<TFormRegisterClientSchema>({
    resolver: zodResolver(formRegisterClientSchema),
    shouldUnregister: true,
    defaultValues: useFormDefaultValues,
  });

  const onSubmit = async (data: TFormRegisterClientSchema) => {
    await registerClientOnSubmitForm({ data, setIsLoading });
    form.reset();
    queryClient.invalidateQueries({ queryKey: ["clients"] });
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
      <Toaster />
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-8 px-1"
      >
        <FormFields form={form} setProcessingZipCode={setProcessingZipCode} />
        <Button
          type="submit"
          variant="destructive"
          className="w-full text-xl font-semibold md:w-fit"
          disabled={isLoading}
        >
          <Loader2 className={`animate-spin ${!isLoading && "hidden"}`} />
          <span className="md:px-3">
            {isLoading ? "Processando..." : "Registrar cliente"}
          </span>
        </Button>
      </form>
    </Form>
  );
};
