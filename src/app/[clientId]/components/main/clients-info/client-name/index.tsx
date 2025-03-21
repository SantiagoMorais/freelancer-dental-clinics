import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const ClientName = ({ name }: { name: string }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger className="max-w-full">
        <h2 className="border-secondary/50 truncate border-b text-center text-xl font-semibold">
          {name}
        </h2>
      </TooltipTrigger>
      <TooltipContent>
        <p>{name}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);
