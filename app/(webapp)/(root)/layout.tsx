import { ReactNode } from "react";
import Navbar from "../components/Navbar/Navbar";

export interface LayoutProps {
  readonly children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <main className="font-work-sans">
      <Navbar />
      {children}
    </main>
  );
}
