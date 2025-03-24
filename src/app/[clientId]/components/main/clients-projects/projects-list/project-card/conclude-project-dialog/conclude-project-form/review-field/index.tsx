import { useState } from "react";
import { ControllerRenderProps } from "react-hook-form";

import { FormControl } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { TConcludeProjectSchema } from "@/core/types/conclude-project-schema";

const MAX_CHARACTERS = 300;

const ReviewField = ({
  field,
}: {
  field: ControllerRenderProps<TConcludeProjectSchema, "review">;
}) => {
  const [characterCount, setCharacterCount] = useState<number>(0);

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setCharacterCount(value.length);
    field.onChange(value);
  };

  return (
    <>
      <FormControl>
        <Textarea
          placeholder="Análise do cliente"
          {...field}
          onChange={handleTextareaChange}
          maxLength={MAX_CHARACTERS}
        />
      </FormControl>
      <div className="text-muted-foreground w-full text-right text-sm">
        {characterCount}/{MAX_CHARACTERS} caracteres
      </div>
    </>
  );
};

export default ReviewField;
