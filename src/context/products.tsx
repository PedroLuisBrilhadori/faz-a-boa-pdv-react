import { Product, createProduct, getProducts, deleteProduct } from "@/services";
import { createContext, useEffect, useState } from "react";

export type ProductContextProps = {
  products: Product[];
  createProduct: (product: any) => Promise<Product>;
  deleteProduct: (product: any) => Promise<void>;
  getProducts: () => Promise<Product[]>;
};

export const ProductContext = createContext({} as ProductContextProps);

export const ProductProvider = ({ children }: any) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts()
      .then((products) => {
        setProducts(products);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        createProduct,
        deleteProduct,
        getProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
