"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { concludeProject } from "@/actions/conclude-project";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Toaster } from "@/components/ui/sonner";
import {
  concludeProjectSchema,
  TConcludeProjectSchema,
} from "@/core/types/conclude-project-schema";

import RatingInput from "./rating-input";
import ReviewField from "./review-field";

export const ConcludeProjectForm = ({ projectId }: { projectId: string }) => {
  const queryClient = useQueryClient();
  const { clientId } = useParams<{ clientId: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<TConcludeProjectSchema>({
    resolver: zodResolver(concludeProjectSchema),
    defaultValues: {
      finishedAt: new Date(),
      rating: 0,
      review: "",
    },
  });

  const onSubmit = async (data: TConcludeProjectSchema) => {
    try {
      setIsLoading(true);
      await concludeProject({
        clientId,
        finishedAt: data.finishedAt,
        rating: data.rating,
        projectId,
      });
    } catch (error) {
      if (process.env.NODE_ENV === "development")
        console.error("Error by editing project:", error);
      toast.error(
        "Não foi possível editar o projeto. Por favor, tente mais tarde."
      );
    } finally {
      setIsLoading(false);
      queryClient.invalidateQueries({ queryKey: ["clientDetails"] });
    }
  };

  return (
    <Form {...form}>
      <Toaster position="bottom-center" />

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col items-center gap-4"
      >
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col items-center">
              <FormLabel>Nota recebida pelo cliente:</FormLabel>
              <RatingInput field={field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="review"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col items-center">
              <FormLabel>Análise do cliente:</FormLabel>
              <ReviewField field={field} />
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
