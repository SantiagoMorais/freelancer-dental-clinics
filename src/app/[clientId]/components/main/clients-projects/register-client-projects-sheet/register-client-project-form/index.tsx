"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ServiceCategory } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { registerProject } from "@/actions/register-project";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import {
  registerProjectSchema,
  TRegisterProjectSchema,
} from "@/core/types/register-project-schema";
import { serviceCategoryTranslations } from "@/utils/services-category-translations";

export const RegisterClientProjectForm = ({
  clientId,
}: {
  clientId: string;
}) => {
  const queryClient = useQueryClient();
  const [buttonAction, setButtonAction] = useState<{
    text: string;
    disabled: boolean;
  }>({ text: "Registrar projeto", disabled: false });
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<TRegisterProjectSchema>({
    resolver: zodResolver(registerProjectSchema),
    shouldUnregister: true,
    defaultValues: {
      serviceCategory: ServiceCategory.LANDING_PAGE,
      servicePrice: "",
    },
  });

  const onSubmit = async (data: TRegisterProjectSchema) => {
    try {
      await registerProject({ clientId, data });
      setIsLoading(true);
    } catch (error) {
      if (process.env.NODE_ENV === "development")
        console.error("Error on register a new project:", error);
    } finally {
      queryClient.invalidateQueries({ queryKey: ["clientDetails"] });
      setIsLoading(false);
      toast.success("Projeto criado com sucesso!");
    }
  };

  const onError = () => {
    setButtonAction({ text: "Revise os campos", disabled: true });

    setTimeout(() => {
      setButtonAction({ text: "Registrar Projeto", disabled: false });
    }, 3000); // Get back to normal after 3 seconds
  };

  return (
    <Form {...form}>
      <Toaster position="bottom-left" />
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className="flex h-full flex-col items-center justify-between gap-8 px-1"
      >
        <FormField
          control={form.control}
          name="serviceCategory"
          render={({ field }) => (
            <FormItem className="w-full space-y-2">
              <FormLabel className="text-lg font-semibold">
                Categoria do serviço
              </FormLabel>
              <FormControl>
                <Select defaultValue={field.value}>
                  <SelectTrigger className="w-full min-w-full">
                    <SelectValue placeholder="Theme" defaultValue="light" />
                  </SelectTrigger>
                  <SelectContent className="w-full">
                    {Object.values(ServiceCategory).map((category) => (
                      <SelectItem key={category} value={category}>
                        {serviceCategoryTranslations[category]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="servicePrice"
          render={({ field }) => (
            <FormItem className="w-full space-y-2">
              <FormLabel className="text-lg font-semibold">
                Valor cobrado
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Não adicione pontos ou vírgula"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          variant="destructive"
          className="mt-auto w-full text-xl font-semibold md:w-fit"
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
