import { ReactNode } from "react";

export interface RootProps {
  children: ReactNode;
}

export default function Root({ children }: RootProps) {
  return (
    <>
      <h1>Root Navigation Bar</h1>
      {children}
    </>
  );
}
