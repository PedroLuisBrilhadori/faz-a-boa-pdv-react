import { Page, TableProducts } from "@/components";
import { AuthContext } from "@/context";
import { useContext } from "react";

const Products = () => {
  return (
    <Page align="center">
      <h1>Lista de Produtos</h1>

      <div className="mt-5 flex flex-col gap-5">
        <div>
          <TableProducts />
        </div>
      </div>
    </Page>
  );
};

export default Products;
