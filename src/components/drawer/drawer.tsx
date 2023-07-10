import { useTheme } from "@/utils/theme";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

export type DrawerProps = {
  title: string;
  description: string;
  trigger: JSX.Element;
  actions: JSX.Element[];
};

export const Drawer = ({
  title,
  description,
  trigger,
  actions,
}: DrawerProps) => {
  const { toggleTheme, theme } = useTheme();

  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent side={"left"} className="flex flex-col gap-5">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-4">
          {actions.map((actions) => {
            return actions;
          })}

          <Button variant="outline" onClick={toggleTheme}>
            Mudar para tema {theme === "light" ? "escuro" : "claro"}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
