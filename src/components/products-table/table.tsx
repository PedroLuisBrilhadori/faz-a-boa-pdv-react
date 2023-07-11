"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ScrollArea } from "@/components/ui/scroll-area";

import { useProducts } from "./product.hook";
import { DataTable } from "../data-table";
import { Button } from "../ui/button";
import { ArrowUpDown, Trash, MoreHorizontal } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type Product = {
  name: string;
  inventory: string;
  price: string;
  unit: boolean;
};

export const columns: ColumnDef<Product>[] = [
  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => {
      const product = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir opções</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(product.name)}
            >
              Copiar nome do produto
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive"
              onClick={() => {
                console.log(product);
              }}
            >
              <Trash className="mr-2 h-4 w-4" />
              Excluir Produto
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
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
      <div className="rounded-md border overflow-auto w-80">
        <DataTable data={data ?? []} columns={columns}></DataTable>
      </div>
    </ScrollArea>
  );
}
