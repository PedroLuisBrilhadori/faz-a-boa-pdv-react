import { Button } from "./components/ui/button";
import { Drawer, DrawerProps } from "./components/drawer/drawer";

const drawerConfig: DrawerProps = {
  title: "Pdv",
  description: "escolha para onde quer ir.",
  trigger: <Button variant="outline">Open</Button>,
  actions: [
    <Button key="comprar" variant="outline">
      Comprar
    </Button>,
    <Button key="historico" variant="outline">
      Historico de Compras
    </Button>,
    <Button key="produtos" variant="outline">
      Lista de Produtos
    </Button>,
  ],
};

function App() {
  return (
    <div className="h-screen w-screen flex items-center justify-around">
      <Drawer {...drawerConfig} />
    </div>
  );
}

export default App;
