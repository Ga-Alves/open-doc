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
      <main className="flex flex-col items-center gap-3 m-0">{children}</main>
    </div>
  );
}
