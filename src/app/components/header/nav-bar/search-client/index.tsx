"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Search } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSearchClientsMethods } from "@/contexts/search-clients-methods-context";
import {
  searchClientsFormSchema,
  TSearchClientsForm,
} from "@/core/types/search-clients-form-schema";

export const SearchClient = () => {
  const { setClientName, isLoading } = useSearchClientsMethods();

  const form = useForm<TSearchClientsForm>({
    resolver: zodResolver(searchClientsFormSchema),
    shouldUnregister: true,
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (data: TSearchClientsForm) => setClientName(data.name || "");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Pesquise clientes"
                  className="rounded-r-none border-r-0"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading} className="rounded-l-none">
          {isLoading ? <Loader2 className="animate-spin" /> : <Search />}
        </Button>
      </form>
    </Form>
  );
};
