import { useEffect } from "react";
import MainLayout from "../../layouts/MainLayout";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../App";

function Home() {
  const auth = useSelector((state: any) => state.auth);

  useEffect(() => {
    const userId = auth?.user?.id;
    if (!userId) return;

    console.log(socket);

    socket.emit("userStatusChanged", {
      userId,
      isOnline: true,
    });

    return () => {
      socket.emit("userStatusChanged", {
        userId,
        isOnline: false,
      });
    };
  }, [auth?.user?.id]);

  return (
    <MainLayout>
      <div className="text-center my-4 text-2xl">Select a conversation</div>
    </MainLayout>
  );
}

export default Home;
