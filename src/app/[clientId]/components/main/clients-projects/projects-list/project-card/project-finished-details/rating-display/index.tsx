import { Star } from "lucide-react";

export const RatingDisplay = ({ rating }: { rating: number }) => (
  <>
    {rating !== null && (
      <div className="bg-muted/50 border-muted-foreground/20 flex w-full flex-col items-center rounded-md border p-1">
        <p className="text-center font-semibold">Nota do cliente:</p>

        <div className="flex">
          {Object.entries([1, 2, 3, 4, 5]).map(([key, value]) => (
            <Star
              key={key}
              className={`text-lg ${rating >= value ? "fill-yellow-400 text-yellow-600" : "fill-gray-500/40 text-gray-500/40"}`}
            />
          ))}
        </div>
      </div>
    )}
  </>
);
