import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AddProductForm } from "./add-product-form";

export const AddProduct = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>
          <Plus />
          Adicionar Produto
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Deseja adicionar um produto?</AlertDialogTitle>
          <AlertDialogDescription>
            Insira as informações necessárias para adicionar um novo produto.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AddProductForm></AddProductForm>
      </AlertDialogContent>
    </AlertDialog>
  );
};
