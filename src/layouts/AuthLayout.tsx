import { ReactNode } from "react";
import AppLayout from "./AppLayout";

type AuthLayoutProps = {
  title: string;
  children?: ReactNode;
};

function AuthLayout({ title, children }: AuthLayoutProps) {
  return (
    <AppLayout title={title}>
      <div className="min-h-screen py-6 bg-primary flex items-center justify-center">
        {children}
      </div>
    </AppLayout>
  );
}

export default AuthLayout;
