"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ScrollArea } from "@/components/ui/scroll-area";

import { useProducts } from "./product.hook";
import { DataTable } from "../data-table";
import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";

import { ActionsRow } from "./actions";
import { Product } from "@/services";

export const columns = (isAdmin: boolean): ColumnDef<Product>[] => [
  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => {
      const product = row.original;

      return <ActionsRow product={product} isAdmin={isAdmin}></ActionsRow>;
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Preço
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const price = row.getValue("price") as string;

      const formatted = `R$ ${price.replace(".", ",")}`;

      return <div className="text-right">{formatted}</div>;
    },
  },
  {
    accessorKey: "unit",
    header: () => <div className="text-right">Unidade</div>,
    cell: ({ row }) => {
      const unit = row.getValue("unit");

      const formatted = unit ? "Unidade" : "Kg";

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "inventory",
    header: () => <div className="text-right">Estoque</div>,
    cell: ({ row }) => {
      const unit = row.getValue("unit");
      const inventory = parseFloat(row.getValue("inventory"));

      const formatted = unit ? "Un." : "Kg";

      return (
        <div className="text-right font-medium">{`${inventory} ${formatted}`}</div>
      );
    },
  },
];

export type TableProductsProps = {
  isAdmin: boolean;
};

export function TableProducts({ isAdmin }: TableProductsProps) {
  const { data } = useProducts();

  return (
    <ScrollArea className="sm:w-max-sm">
      <div className="rounded-md border w-80 md:w-full h-[450px]">
        <DataTable data={data ?? []} columns={columns(isAdmin)}></DataTable>
      </div>
    </ScrollArea>
  );
}
