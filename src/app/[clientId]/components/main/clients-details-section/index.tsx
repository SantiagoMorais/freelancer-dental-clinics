import { ClientDetailsData } from "./client-details-data";
import { UpdateAndDeleteClientSheet } from "./update-and-delete-client-sheet";

export const ClientsDetailsSection = () => (
  <section className="bg-muted/50 border-muted flex w-full flex-col items-center gap-4 rounded-lg border p-4 md:flex-1 md:p-6">
    <ClientDetailsData />
    <UpdateAndDeleteClientSheet />
  </section>
);
