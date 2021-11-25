import { ReactNode } from "react";
import { Header } from "../Header";

type LayoutProps = {
  children: ReactNode
}
export const Layout = ({ children }: LayoutProps) => (
  <>
    <Header />
    {children}
  </>
);
