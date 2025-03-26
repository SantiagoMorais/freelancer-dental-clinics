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
