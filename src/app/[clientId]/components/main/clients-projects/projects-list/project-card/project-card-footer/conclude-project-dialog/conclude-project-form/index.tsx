"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  concludeProjectSchema,
  TConcludeProjectSchema,
} from "@/core/types/conclude-project-schema";
import { concludeProjectFormOnSubmit } from "@/utils/projects-list-functions/conclude-project-form-on-submit";

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
    await concludeProjectFormOnSubmit({
      clientId,
      data,
      projectId,
      setIsLoading,
    });
    queryClient.invalidateQueries({ queryKey: ["clientProjects"] });
  };

  return (
    <Form {...form}>
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
        <div className="flex w-full flex-wrap items-center gap-4">
          <Button variant="destructive" disabled={isLoading} className="flex-1">
            {isLoading ? <Loader2 className="animate-spin" /> : "Confirmar"}
          </Button>
          <DialogClose asChild className="flex-1">
            <Button>Cancelar</Button>
          </DialogClose>
        </div>
      </form>
    </Form>
  );
};
