import { ReactNode } from "react";

export interface DashboardProps {
  children: ReactNode;
}

export default function Dashboard({ children }: DashboardProps) {
  return (
    <>
      <h1>Dashboard Navigation Bar</h1>
      {children}
    </>
  );
}
