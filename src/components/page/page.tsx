import { ReactNode } from "react";
import { Navbar } from "../navbar";
import { DrawerProvider } from "@/context/drawer";

export type PageProps = {
  children: ReactNode;
  align?: "start" | "center" | "baseline" | "stretch" | "end";
  className?: string;
};

export const Page = ({ children, align, className }: PageProps) => {
  const alignment = `items-${align || "center"}`;

  return (
    <div className={`flex flex-col gap-2 w-full ${alignment} ${className}`}>
      <div className="w-full">
        <DrawerProvider>
          <Navbar />
        </DrawerProvider>
      </div>

      {children}
    </div>
  );
};
