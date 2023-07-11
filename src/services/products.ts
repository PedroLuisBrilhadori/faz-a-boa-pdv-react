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

export const createProduct = async (product: Product) => {
  const { headers } = headerToken();
  const body = JSON.stringify(product);

  const response = await fetch(APIRoutes.products, {
    headers,
    method: "POST",
    body,
  });

  if (response.status !== 201) throw new Error("Produto não criado");

  return response.json();
};

export const deleteProduct = async (product: Product) => {
  const { headers } = headerToken();

  const response = await fetch(`${APIRoutes.products}/${product.name}`, {
    headers,
    method: "DELETE",
  });

  if (response.status !== 200) throw new Error("Produto não excluido");

  return response.json();
};
