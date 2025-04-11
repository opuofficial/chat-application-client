import { ReactNode } from "react";

interface ContainerProps {
  children?: ReactNode;
}

function Container({ children }: ContainerProps) {
  return <section className="max-w-5xl m-auto p-4">{children}</section>;
}

export default Container;
