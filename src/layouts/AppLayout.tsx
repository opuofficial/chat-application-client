import { ReactNode } from "react";
import { Helmet } from "react-helmet-async";

type AppLayoutProps = {
  title: string;
  children?: ReactNode;
};

function AppLayout({ title, children }: AppLayoutProps) {
  return (
    <div className="text-default">
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </div>
  );
}

export default AppLayout;
