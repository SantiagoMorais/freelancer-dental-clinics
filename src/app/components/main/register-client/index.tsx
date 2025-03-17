"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertDialogTitle } from "@radix-ui/react-alert-dialog";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { toast } from "sonner";

import { registerClient } from "@/actions/register-client";
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
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

export const RegisterClient = () => {
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
      toast("Cliente registrado com sucesso! Veja na lista de novos clientes.");
    } catch (error) {
      console.error("Error registering a new client:", error);
      toast(`Erro: ${error}`);
    } finally {
      setIsLoading(false);
    }
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
        "CEP inválido. Tente novamente ou preencha o endereço manualmente."
      );
    } finally {
      setProcessingZipCode(false);
    }
  };

  return (
    <Form {...form}>
      {processingZipCode && (
        <AlertDialog open>
          <AlertDialogTitle>Carregando Endereço</AlertDialogTitle>
          <AlertDialogContent className="flex flex-col items-center gap-4">
            <h2 className="text-2xl font-bold uppercase">
              Carregando Endereço
            </h2>
            <Loader2 className="size-16 animate-spin" />
          </AlertDialogContent>
        </AlertDialog>
      )}
      <Toaster />
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-4"
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">
                  Client/Company Name{" "}
                  <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Client or Company name"
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
                  Phone Number <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <PatternFormat
                    className="border-primary font-semibold"
                    format="(##) # ####-####"
                    customInput={Input}
                    placeholder="Phone number"
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
                    placeholder="Phone number"
                    {...field}
                    onBlur={async (e) => processZipCode(e.target.value)}
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
              <FormItem>
                <FormLabel className="text-lg font-semibold">
                  Já possui um site <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Switch
                    className="scale-150 cursor-pointer"
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
          className="w-full rounded-full text-xl font-semibold md:w-fit"
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
