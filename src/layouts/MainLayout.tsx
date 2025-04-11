import AppLayout from "./AppLayout";
import Navbar from "../components/common/Navbar";
import Chats from "../components/Chats";
import Container from "../components/common/Container";
import { ReactNode } from "react";

function MainLayout({ children }: { children: ReactNode }) {
  return (
    <AppLayout title="Messages">
      <Navbar />
      <Container>
        <div className="grid grid-cols-3">
          <div className="col-span-1">
            <Chats />
          </div>
          <div className="col-span-2">{children}</div>
        </div>
      </Container>
    </AppLayout>
  );
}

export default MainLayout;
