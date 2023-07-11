"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ScrollArea } from "@/components/ui/scroll-area";

import { useProducts } from "./product.hook";
import { DataTable } from "../data-table";

export type Product = {
  name: string;
  inventory: string;
  price: string;
  unit: boolean;
};

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Nome",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "price",
    header: "Preço",
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
      const unit = parseFloat(row.getValue("unit"));

      const formatted = unit ? "Unidade" : "Kg";

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "inventory",
    header: () => <div className="text-right">Estoque</div>,
    cell: ({ row }) => {
      const unit = parseFloat(row.getValue("unit"));
      const inventory = parseFloat(row.getValue("inventory"));

      const formatted = unit ? "Unidades" : "Kg";

      return (
        <div className="text-right font-medium">{`${inventory} ${formatted}`}</div>
      );
    },
  },
];

export function TableProducts() {
  const { data } = useProducts();

  return (
    <ScrollArea className="sm:w-max-sm overflow-auto">
      <div className="rounded-md border overflow-auto w-[300px]">
        <DataTable data={data} columns={columns}></DataTable>
      </div>
    </ScrollArea>
  );
}
