import type { ReactNode } from "react";
import Header from "./header";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout(props: LayoutProps) {
  const { children } = props;
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  );
}
