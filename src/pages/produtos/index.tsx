import { Page, TableProducts } from "@/components";
import { AuthContext } from "@/context";
import { useContext } from "react";
import { AddProduct } from "./_components";

const Products = () => {
  const { user } = useContext(AuthContext);

  const isAdmin = user?.role === "admin";

  return (
    <Page align="center" className="gap-6">
      <h1>Lista de Produtos</h1>

      <AddProduct />

      <div className="flex flex-col gap-5">
        <div>
          <TableProducts {...{ isAdmin }} />
        </div>
      </div>
    </Page>
  );
};

export default Products;
