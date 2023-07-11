import { Page, TableProducts } from "@/components";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Compras = () => {
  return (
    <Page align="center">
      <h1>Nova Compra</h1>

      <div className="mt-5 flex flex-col gap-5">
        <div>
          <Label>Nome</Label>
          <Input></Input>
        </div>

        <div>
          <TableProducts />
        </div>
      </div>
    </Page>
  );
};

export default Compras;
