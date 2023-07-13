import * as z from "zod";
import { APIRoutes, getToken } from "./api";

export const productSchema = z.object({
  name: z.string().max(100),
  price: z.number(),
  unit: z.boolean(),
  inventory: z.number(),
  active: z.boolean(),
});

export type Product = z.infer<typeof productSchema>;

const headerToken = () => {
  const token = getToken();

  if (!token) throw new Error("Usuário não autorizado");

  const headers = new Headers();

  headers.append("Authorization", `Bearer ${token}`);
  headers.append("Content-Type", "application/json");

  return { headers, token };
};

export const getProducts = async () => {
  const result = await fetch(`${APIRoutes.products}?max=10000&page=1`);

  if (result.status !== 200) throw new Error();

  const { data } = await result.json();

  return data as Product[];
};

export const createProduct = async (product: Product) => {
  const { headers } = headerToken();
  const body = JSON.stringify(product);

  const response = await fetch(APIRoutes.products, {
    headers,
    method: "POST",
    body,
  });

  if (response.status !== 201) throw new Error("Produto não criado");

  const { data } = await response.json();

  return data as Product;
};

export const deleteProduct = async (product: Product) => {
  const { headers } = headerToken();

  const response = await fetch(`${APIRoutes.products}/${product.name}`, {
    headers,
    method: "DELETE",
  });

  if (response.status !== 200) throw new Error("Produto não excluido");

  await response.json();
};
