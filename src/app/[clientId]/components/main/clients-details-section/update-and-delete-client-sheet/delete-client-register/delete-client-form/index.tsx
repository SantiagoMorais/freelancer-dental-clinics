"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { ConfirmAndCancelButtons } from "@/components/confirm-and-cancel-buttons";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { deleteClientOnSubmitForm } from "@/utils/delete-client-functions/delete-client-on-submit-form";
import {
  deleteClientSchema,
  deleteMessageConfirmation,
} from "@/utils/delete-client-functions/delete-client-schema";

export const DeleteClientForm = ({ clientName }: { clientName: string }) => {
  const queryClient = useQueryClient();
  const { clientId } = useParams<{ clientId: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<{ typeConfirmation: string }>({
    resolver: zodResolver(deleteClientSchema({ clientName })),
    defaultValues: {
      typeConfirmation: "",
    },
  });

  const onSubmit = async () => {
    await deleteClientOnSubmitForm({
      clientId,
      setIsLoading,
      queryClient,
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col items-center gap-4"
      >
        <FormField
          control={form.control}
          name="typeConfirmation"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="flex flex-col text-center select-auto">
                Para concluir a exclusão digite o texto abaixo:
                <span className="text-destructive">
                  {`"`}
                  {deleteMessageConfirmation({ clientName })}
                  {`"`}
                </span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite o texto acima e confirme"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <ConfirmAndCancelButtons isLoading={isLoading} colors="secondary" />
      </form>
    </Form>
  );
};
