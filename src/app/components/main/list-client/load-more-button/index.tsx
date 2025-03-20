import { Client } from "@prisma/client";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ILoadMoreButtonProps {
  isFetching: boolean;
  data: Client[] | undefined;
  handleLoadMore: () => void;
}

export const LoadMoreButton = ({
  data,
  isFetching,
  handleLoadMore,
}: ILoadMoreButtonProps) => {
  const content = () => {
    if (isFetching) return <Loader2 className="animate-spin" />;
    if (data && data.length > 0) return "Carregar mais";
    return "Todos os clientes carregados";
  };

  return (
    <div className="mt-4 flex justify-center">
      <Button
        onClick={handleLoadMore}
        disabled={isFetching || !data || data.length === 0}
        variant="outline"
      >
        {content()}
      </Button>
    </div>
  );
};
