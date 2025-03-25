"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { deleteClientProjectOnSubmitForm } from "@/utils/projects-list-functions/delete-client-project-on-submit-form";
import {
  deleteProjectMessageConfirmation,
  deleteProjectSchema,
} from "@/utils/projects-list-functions/delete-project-schema";

export const DeleteProjectForm = ({
  projectName,
  projectId,
}: {
  projectName: string;
  projectId: string;
}) => {
  const queryClient = useQueryClient();
  const { clientId } = useParams<{ clientId: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<{ typeConfirmation: string }>({
    resolver: zodResolver(deleteProjectSchema({ projectName })),
    defaultValues: {
      typeConfirmation: "",
    },
  });

  const onSubmit = async () => {
    await deleteClientProjectOnSubmitForm({
      clientId,
      setIsLoading,
      projectId,
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
                  {deleteProjectMessageConfirmation({ projectName })}
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
        <Button variant="destructive" disabled={isLoading}>
          {isLoading ? <Loader2 className="animate-spin" /> : "Confirmar"}
        </Button>
      </form>
    </Form>
  );
};
