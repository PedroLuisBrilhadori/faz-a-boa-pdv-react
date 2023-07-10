import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DrawerProps, Drawer } from "../drawer";

const drawerConfig: DrawerProps = {
  title: "Pdv",
  description: "escolha para onde quer ir.",
  trigger: (
    <Button variant="ghost">
      <Menu></Menu>
    </Button>
  ),
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

export const Navbar = () => {
  return (
    <div className="flex justify-between p-2 border-b-2">
      <Drawer {...drawerConfig} />

      <Avatar>
        <AvatarImage
          src="https://github.com/pedroluisbrilhadori.png"
          alt="@shadcn"
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
};
