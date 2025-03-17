"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertDialogTitle } from "@radix-ui/react-alert-dialog";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { toast } from "sonner";

import { registerClient } from "@/actions/register-client";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
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
import { Switch } from "@/components/ui/switch";
import {
  formRegisterClientSchema,
  TFormRegisterClientSchema,
} from "@/core/types/form-register-client-schema";
import { getAddressByZipCode } from "@/functions/get-address-by-zip-code";

export const RegisterClientForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [processingZipCode, setProcessingZipCode] = useState(false);

  const form = useForm<TFormRegisterClientSchema>({
    resolver: zodResolver(formRegisterClientSchema),
    shouldUnregister: true,
    defaultValues: {
      companyName: "",
      street: "",
      neighborhood: "",
      addressNumber: "",
      state: "",
      city: "",
      openingHours: "",
    },
  });

  const onSubmit = async (data: TFormRegisterClientSchema) => {
    setIsLoading(true);
    const address = `${data.street}, ${data.addressNumber} - ${data.neighborhood}, ${data.city} - ${data.state}`;

    try {
      await registerClient({
        companyName: data.companyName,
        address,
        hasAnWebSite: data.hasAnWebSite,
        openingHours: data.openingHours,
        phone: data.phone,
        ...(data.socialMedia && { socialMedia: data.socialMedia }),
        ...(data.notes && { notes: data.notes }),
      });
      toast(
        "Cliente registrado com sucesso! Veja na lista de novos clientes.",
        { description: "" }
      );
    } catch (error) {
      console.error("Error registering a new client:", error);
      toast(`Erro: ${error}`, { description: "" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetZipCodeValue = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    const formatedValue = value.replace(/-/g, "").trim();

    if (formatedValue.length === 8) {
      processZipCode(formatedValue);
    }
    return;
  };

  const processZipCode = async (zipCode: string) => {
    setProcessingZipCode(true);
    try {
      const address = await getAddressByZipCode(zipCode);
      form.setValue("street", address.logradouro);
      form.setValue("neighborhood", address.bairro);
      form.setValue("city", address.localidade);
      form.setValue("state", address.uf);
    } catch (error) {
      console.error("Erro ao buscar endereço:", error);
      toast(
        "CEP inválido. Tente novamente ou preencha o endereço manualmente.",
        {
          description: "",
        }
      );
    } finally {
      setProcessingZipCode(false);
    }
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
        <div className="grid w-full grid-cols-1 gap-6">
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">
                  Nome do cliente/empresa{" "}
                  <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nome do cliente ou empresa"
                    {...field}
                    className="border-primary font-semibold"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">
                  Telefone <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <PatternFormat
                    className="border-primary font-semibold"
                    format="(##) # ####-####"
                    customInput={Input}
                    placeholder="Telefone"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="zipCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">
                  CEP (opcional)
                </FormLabel>
                <FormControl>
                  <PatternFormat
                    className="border-primary font-semibold"
                    format="#####-###"
                    customInput={Input}
                    placeholder="CEP"
                    {...field}
                    onBlur={async (e) => handleGetZipCodeValue(e)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="street"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">
                  Logradouro <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Logradouro/rua"
                    {...field}
                    className="border-primary font-semibold"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="neighborhood"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">
                  Bairro <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Bairro"
                    {...field}
                    className="border-primary font-semibold"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="addressNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">
                  Número <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Número"
                    {...field}
                    className="border-primary font-semibold"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="complement"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">
                  Complemento (opcional)
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Complemento"
                    {...field}
                    className="border-primary font-semibold"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">
                  Cidade <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Cidade"
                    {...field}
                    className="border-primary font-semibold"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">
                  UF <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    max={2}
                    min={2}
                    placeholder="UF. Ex: MG"
                    {...field}
                    className="border-primary font-semibold uppercase placeholder:capitalize"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="hasAnWebSite"
            render={({ field }) => (
              <FormItem className="flex flex-wrap gap-4">
                <FormLabel className="text-lg font-semibold">
                  Já possui um site <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Switch
                    className="ml-2 scale-150 cursor-pointer"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="openingHours"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">
                  Horário de funcionamento{" "}
                  <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Horário de funcionamento"
                    {...field}
                    className="border-primary font-semibold"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="socialMedia"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">
                  Rede social do cliente (opcional)
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Rede Social"
                    {...field}
                    className="border-primary font-semibold"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">
                  Notas adicionais (opcional)
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Notas"
                    {...field}
                    className="border-primary font-semibold"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
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
