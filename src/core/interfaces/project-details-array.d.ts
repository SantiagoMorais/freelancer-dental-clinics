export interface IProjectDetailsResponse {
  label: string;
  value: string;
  extraClass?: string | undefined;
}

export interface IProjectDetailsRequest {
  project: Pick<
    ClientProject,
    "createdAt" | "paymentStatus" | "serviceCategory" | "servicePrice"
  >;
}
