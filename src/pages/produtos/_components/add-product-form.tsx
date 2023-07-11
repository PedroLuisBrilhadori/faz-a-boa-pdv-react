import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertDialogCancel } from "@/components/ui/alert-dialog";
import { Product, createProduct, productSchema } from "@/services";
import { useToast } from "@/components/ui/use-toast";

const productProps = {
  inputs: {
    name: "Nome",
    price: "Preço",
    inventory: "Estoque",
    unit: "Unidade",
    active: "Ativo",
  },
};

export const AddProductForm = () => {
  const form = useForm<Product>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      price: 0,
      unit: false,
      inventory: 0,
      active: true,
    },
  });

  const { toast } = useToast();

  const onSubmit = (data: Product) => {
    createProduct(data)
      .then(({ data }) => {
        toast({
          title: `${data.name} Criado!`,
          description: `Produto criado com sucesso!`,
          variant: "default",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="">
      <Form {...form}>
        <form
          className="flex flex-col gap-3"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full w-max-md">
                <FormLabel>{productProps.inputs.name}</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="w-full w-max-md">
                <FormLabel>{productProps.inputs.price}</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    value={field.value}
                    onChange={(value) => {
                      field.onChange(Number(value.target.value));
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="inventory"
            render={({ field }) => (
              <FormItem className="w-full w-max-md">
                <FormLabel>{productProps.inputs.inventory}</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    value={field.value}
                    onChange={(value) => {
                      field.onChange(Number(value.target.value));
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex justify-center items-center">
            <FormField
              control={form.control}
              name="unit"
              render={({ field }) => {
                return (
                  <FormItem className="w-full w-max-md flex gap-3 justify-center items-center">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          field.onChange(checked ? true : false);
                        }}
                      ></Checkbox>
                    </FormControl>
                    <FormLabel>{productProps.inputs.unit}</FormLabel>
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="active"
              render={({ field }) => {
                return (
                  <FormItem className="w-full w-max-md flex gap-3 justify-center items-center">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          field.onChange(checked ? true : false);
                        }}
                      ></Checkbox>
                    </FormControl>
                    <FormLabel>{productProps.inputs.active}</FormLabel>
                  </FormItem>
                );
              }}
            />
          </div>

          <Button type="submit"> Adicionar </Button>
          <AlertDialogCancel type="button">Cancelar</AlertDialogCancel>
        </form>
      </Form>
    </div>
  );
};
