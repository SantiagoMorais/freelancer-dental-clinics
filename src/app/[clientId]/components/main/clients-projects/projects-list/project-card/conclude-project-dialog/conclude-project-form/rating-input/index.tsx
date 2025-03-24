import { Star } from "lucide-react";
import { useState } from "react";
import { ControllerRenderProps } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export interface IRatingInput {
  field: ControllerRenderProps<
    {
      rating: number;
      finishedAt: Date;
      review?: string | undefined;
    },
    "rating"
  >;
}

const RatingInput = ({ field }: IRatingInput) => {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);

  const handleClick = (value: number) => {
    console.log("value", value);
    console.log("rating", rating);

    setRating(value === rating ? 0 : value);
  };

  const handleMouseOver = (value: number) => {
    setHoverRating(value);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  return (
    <div>
      <FormControl>
        <Input
          {...field}
          type="number"
          value={rating}
          readOnly
          className="hidden"
        />
      </FormControl>

      <div className="flex">
        {Object.entries([1, 2, 3, 4, 5]).map(([key, value]) => (
          <Button
            variant="ghost"
            size="icon"
            key={key}
            type="button"
            onClick={() => handleClick(value)}
            onMouseOver={() => handleMouseOver(value)}
            onMouseLeave={handleMouseLeave}
            className="focus:outline-none"
          >
            <Star
              className={`size-6 text-lg ${(hoverRating || rating) >= value ? "fill-yellow-400 text-yellow-600" : "fill-gray-500/40 text-gray-500/40"}`}
            />
          </Button>
        ))}
      </div>
    </div>
  );
};

export default RatingInput;
