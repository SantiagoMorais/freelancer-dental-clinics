"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { deleteClientRegister } from "@/actions/delete-client-register";
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
import { Toaster } from "@/components/ui/sonner";

export const DeleteClientForm = ({ clientName }: { clientName: string }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { clientId } = useParams<{ clientId: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const deleteMessageConfirmation = `Excluir ${clientName.slice(0, 50)}`;

  const deleteClientSchema = z.object({
    typeConfirmation: z
      .string()
      .refine(
        (value) =>
          value.toLowerCase() === deleteMessageConfirmation.toLowerCase(),
        {
          message: "O texto digitado não coincide.",
        }
      ),
  });

  const form = useForm<{ typeConfirmation: string }>({
    resolver: zodResolver(deleteClientSchema),
    defaultValues: {
      typeConfirmation: "",
    },
  });

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      await deleteClientRegister(clientId);
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      queryClient.invalidateQueries({ queryKey: ["searchClients"] });
      router.push("/");
      window.location.href = "/";
    } catch (error) {
      if (process.env.NODE_ENV === "development")
        console.error("Error by deleting client:", error);
      toast.error(
        "Não foi possível excluir o registro. Por favor, tente mais tarde."
      );
    } finally {
      setIsLoading(false);
    }
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
                  {deleteMessageConfirmation}
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
