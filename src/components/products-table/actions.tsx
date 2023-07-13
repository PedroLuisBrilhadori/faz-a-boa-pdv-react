import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal, Pen, Trash } from "lucide-react";
import { Product } from "@/services";
import { useContext } from "react";
import { ProductContext } from "@/context/products";

export type ActionsProps = {
  isAdmin: boolean;
  product: Product;
};

export const ActionsRow = ({ product, isAdmin }: ActionsProps) => {
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

        {isAdmin ? <AdminOptions {...{ isAdmin, product }} /> : <></>}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const AdminOptions = ({ product }: ActionsProps) => {
  const { deleteProduct } = useContext(ProductContext);

  return (
    <div>
      <DropdownMenuSeparator />

      <DropdownMenuLabel>Adminitradores</DropdownMenuLabel>

      <DropdownMenuItem
        onClick={() => {
          console.log(product);
        }}
      >
        <Pen className="mr-2 h-4 w-4" />
        Editar Produto
      </DropdownMenuItem>

      <DropdownMenuSeparator />
      <DropdownMenuItem
        className="text-destructive"
        onClick={() => {
          deleteProduct(product)
            .then((data) => {
              console.log("Produto deletado");
            })
            .catch((error) => {
              console.log(error);
            });
        }}
      >
        <Trash className="mr-2 h-4 w-4" />
        Excluir Produto
      </DropdownMenuItem>
    </div>
  );
};
