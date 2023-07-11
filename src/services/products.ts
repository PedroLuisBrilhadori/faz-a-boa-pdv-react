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

export const createProduct = async (product: Product) => {
  const token = getToken();

  if (!token) throw new Error();

  const headers = new Headers();

  headers.append("Authorization", `Bearer ${token}`);
  headers.append("Content-Type", "application/json");

  const body = JSON.stringify(product);

  const response = await fetch(APIRoutes.products, {
    headers,
    method: "POST",
    body,
  });

  if (response.status !== 201) throw new Error("Produto não criado");

  return response.json();
};
