import type { ReactNode } from "react";
import Header from "./header";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50/50 font-sans text-gray-900 antialiased">
      <Header />
      <main className="max-w-4xl mx-auto px-6 py-10">{children}</main>
    </div>
  );
}