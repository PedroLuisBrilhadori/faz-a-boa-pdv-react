import { useEffect, useState } from "react";
import { Product } from "./table";
import { APIRoutes } from "@/services";
import { useToast } from "../ui/use-toast";

export const getProducts = async () => {
  const result = await fetch(`${APIRoutes.products}?max=10000&page=1`);

  if (result.status !== 200) throw new Error();

  const { data } = await result.json();

  return data;
};

export const useProducts = () => {
  const [data, setData] = useState<Product[]>();
  const { toast } = useToast();

  useEffect(() => {
    getProducts()
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        toast({
          title: "Erro ao obter produtos",
          description: "Por favor tente novamente mais tarde.",
          variant: "destructive",
        });
      });
  }, []);

  return { data };
};
