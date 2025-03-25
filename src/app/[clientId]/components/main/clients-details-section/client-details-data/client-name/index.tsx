import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const ClientName = ({ name }: { name: string }) => (
  <Tooltip>
    <TooltipTrigger className="flex w-full justify-center pt-0">
      <h2 className="bg-secondary/50 w-fit truncate rounded-md px-2 py-1 pt-0 text-center text-xl font-semibold">
        {name}
      </h2>
    </TooltipTrigger>
    <TooltipContent>
      <p>{name}</p>
    </TooltipContent>
  </Tooltip>
);
