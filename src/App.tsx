import { Moon, Sun } from "lucide-react";
import { Button } from "./components/ui/button";
import {
  Sheet,
  SheetDescription,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./components/ui/sheet";
import { useTheme } from "./utils/theme";

function App() {
  const { toggleTheme } = useTheme();

  return (
    <div className="h-screen w-screen flex items-center justify-around">
      <Button variant="outline" onClick={toggleTheme}>
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>

      <Sheet>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent side={"left"} className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>Are you sure absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default App;
