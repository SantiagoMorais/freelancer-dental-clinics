import { Star } from "lucide-react";

export const RatingDisplay = ({ rating }: { rating: number }) => {
  return (
    <>
      {rating !== null && (
        <div className="bg-muted/50 border-muted-foreground/20 flex w-full flex-col items-center rounded-md border p-1">
          <p className="text-center font-semibold">Nota do cliente:</p>

          <div className="flex">
            {Object.entries([1, 2, 3, 4, 5]).map(([key, value]) => (
              <Star
                key={key}
                fill={rating >= value ? "#FFD700" : "none"}
                className="text-lg text-orange-300"
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};
