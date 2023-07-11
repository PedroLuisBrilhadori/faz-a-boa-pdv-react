import { Product } from "./table";

export const useProducts = () => {
  const data: Product[] = [
    {
      name: "Banana Maçã",
      price: "3.99",
      unit: false,
      inventory: "3",
    },
    {
      name: "Banana Nanica",
      price: "4.99",
      unit: false,
      inventory: "3",
    },
    {
      name: "Mel",
      price: "4.99",
      unit: true,
      inventory: "3",
    },
    {
      name: "Mel Grande",
      price: "10.99",
      unit: true,
      inventory: "3",
    },
    {
      name: "Mel Médio",
      price: "10.99",
      unit: true,
      inventory: "3",
    },
  ];

  return { data };
};
