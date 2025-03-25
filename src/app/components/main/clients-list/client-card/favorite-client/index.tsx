"use client";

import { Client } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { updateClientAsFavorite } from "@/actions/update-client-as-favorite";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const FavoriteClient = ({
  client: initialClient,
}: {
  client: Client;
}) => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [client, setClient] = useState(initialClient);

  const handleClientFavorite = async () => {
    setIsLoading(true);
    try {
      await updateClientAsFavorite({
        clientId: client.id,
        makeFavorite: !client.favorite,
      });
      toast.success(
        client.favorite
          ? "Cliente removido dos favoritos."
          : "Cliente favoritado com sucesso."
      );
      setClient((prev) => ({ ...prev, favorite: !prev.favorite }));
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      queryClient.invalidateQueries({ queryKey: ["searchClients"] });
    } catch (error) {
      if (process.env.NODE_ENV === "development") console.error(error);
      toast.error("Erro ao favoritar cliente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            disabled={isLoading}
            onClick={() => handleClientFavorite()}
            variant="ghost"
            size="icon"
            className="group group-hover:scale-105"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Star
                className={`size-5 duration-100 group-hover:fill-yellow-400 group-hover:text-amber-500 ${client.favorite && "fill-yellow-400 text-amber-500"}`}
              />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Favoritar cliente</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
