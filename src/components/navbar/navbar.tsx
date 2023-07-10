import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DrawerProps, Drawer } from "../drawer";
import { DrawerCtx, DrawerContext } from "@/context/drawer";
import { useContext } from "react";

export const Navbar = () => {
  const context = useContext(DrawerContext);

  const drawerConfig: DrawerProps = {
    title: "Pdv",
    description: "escolha para onde quer ir.",
    trigger: (
      <Button variant="ghost">
        <Menu></Menu>
      </Button>
    ),
    actions: [
      <NavbarAction key="/" route="/" name="Início" drawerContext={context} />,
      <NavbarAction
        key="/compra"
        route="/compra"
        name="Nova compra"
        drawerContext={context}
      />,
      <NavbarAction
        key="/historico"
        route="/historico"
        name="Histórico de Compras"
        drawerContext={context}
      />,
      <NavbarAction
        key="/produtos"
        route="/produtos"
        name="Lista de Produtos"
        drawerContext={context}
      />,
    ],
  };

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

export type NavbarActionProps = {
  name: string;
  route: string;
  drawerContext: DrawerCtx;
};

export const NavbarAction = ({
  name,
  route,
  drawerContext,
}: NavbarActionProps) => {
  const { pathname, navigate } = drawerContext;

  const active = pathname === route;

  const variant = active ? "default" : "outline";

  return (
    <Button
      variant={variant}
      onClick={() => {
        navigate(route);
      }}
    >
      {name}
    </Button>
  );
};
