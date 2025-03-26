import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ILoadMoreButtonProps } from "@/core/interfaces/load-more-button-props";

export const LoadMoreButton = ({
  isFetching,
  hasMore,
  handleLoadMore,
}: ILoadMoreButtonProps) => {
  const content = () => {
    if (isFetching) return <Loader2 className="animate-spin" />;
    if (hasMore) return "Carregar mais";
    return "Todos os clientes carregados";
  };

  return (
    <div className="mt-4 flex justify-center">
      <Button
        onClick={handleLoadMore}
        disabled={isFetching || !hasMore}
        variant="outline"
      >
        {content()}
      </Button>
    </div>
  );
};
