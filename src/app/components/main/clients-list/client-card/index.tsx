import { Client } from "@prisma/client";
import { Plus } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatWorkingStatus } from "@/utils/register-client-functions/format-working-status";

import { FavoriteClient } from "./favorite-client";

export const ClientCard = ({ client }: { client: Client }) => (
  <Card key={client.id} className="bg-muted/50 gap-4">
    <CardHeader>
      <div className="flex justify-between">
        <CardTitle className="truncate">{client.companyName}</CardTitle>
        <FavoriteClient client={client} />
      </div>
      <CardDescription className="">
        Status:{" "}
        <span
          className={`font-semibold ${formatWorkingStatus(client.workingProgress).color}`}
        >
          {formatWorkingStatus(client.workingProgress).status}
        </span>
      </CardDescription>
    </CardHeader>
    <CardContent className="text-sm">
      <p className="truncate">
        <span className="font-semibold">Endereço:</span> {client.address}
      </p>
      <p className="truncate">
        <span className="font-semibold">Horário:</span> {client.openingHours}
      </p>
      <Link href={`/${client.id}`}>
        <Button
          size="sm"
          className="mt-2 duration-300 hover:scale-95 hover:opacity-80"
        >
          <Plus />
          Detalhes
        </Button>
      </Link>
    </CardContent>
  </Card>
);
