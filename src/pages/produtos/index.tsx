import { Page, TableProducts } from "@/components";

const Compras = () => {
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

export default Compras;
