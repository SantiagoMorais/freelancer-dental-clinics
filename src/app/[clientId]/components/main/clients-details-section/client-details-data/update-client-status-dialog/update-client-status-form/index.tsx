"use client";

import { WorkingProgress } from "@prisma/client";
import { DialogClose } from "@radix-ui/react-dialog";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { updateClientStatus } from "@/actions/update-client-status";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TUpdateClientStatusSchema } from "@/core/types/update-client-status-schema";
import { workingStatusTranslations } from "@/utils/projects-list-functions/working-status-translations";

export const UpdateClientStatusForm = ({
  currentStatus,
}: {
  currentStatus: WorkingProgress;
}) => {
  const { clientId } = useParams<{ clientId: string }>();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<{ status: WorkingProgress }>({
    defaultValues: {
      status: currentStatus,
    },
  });

  const onSubmit = async (data: TUpdateClientStatusSchema) => {
    setIsLoading(true);
    try {
      await updateClientStatus({
        clientId,
        status: data.status as WorkingProgress,
      });
      queryClient.invalidateQueries({ queryKey: ["clientDetails"] });
      queryClient.invalidateQueries({ queryKey: ["clients"], exact: false });
      toast.success("Status do cliente atualizados com sucesso!");
    } catch (error) {
      if (process.env.NODE_ENV === "development")
        console.error("❌ Error by updating client status", error);
      toast.error(
        "Não foi possível atualizar o status do cliente. Por favor, tente mais tarde."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="mb-4 w-full">
              <FormLabel className="font-semibold">
                Categoria do serviço
              </FormLabel>
              <FormControl>
                <Select
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="w-full min-w-full">
                    <SelectValue
                      placeholder="Status"
                      defaultValue={field.value}
                      className="font-semibold"
                    />
                  </SelectTrigger>
                  <SelectContent className="w-full">
                    {Object.values(WorkingProgress).map((status) => (
                      <SelectItem
                        key={status}
                        value={status}
                        className="font-semibold"
                      >
                        {workingStatusTranslations[status]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex w-full flex-wrap gap-4">
          <DialogClose asChild>
            <Button
              type="button"
              disabled={isLoading}
              variant="destructive"
              className="flex-1"
            >
              Cancelar
            </Button>
          </DialogClose>
          <Button disabled={isLoading} className="flex-1" type="submit">
            {isLoading ? <Loader2 className="animate-spin" /> : "Atualizar"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
