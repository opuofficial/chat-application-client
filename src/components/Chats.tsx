import { useEffect } from "react";
import { useGetConversationsQuery } from "../services/userApi";
import ChatItem from "./ChatItem";
import { useDispatch, useSelector } from "react-redux";
import {
  setConversations,
  updateOnlineStatus,
} from "../store/conversationsSlice";
import { Conversation } from "../types/types";
import { socket } from "../App";

function Chats() {
  const { data: conversationsData } = useGetConversationsQuery({});
  const dispatch = useDispatch();
  const conversations = useSelector((state) => (state as any).conversations);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    socket.on("userStatusChanged", ({ userId, isOnline }) => {
      // console.log("Status changed:", userId, isOnline);

      dispatch(updateOnlineStatus({ _id: userId, isOnline }));
    });

    return () => {
      socket.off("userStatusChanged");
    };
  }, [auth?.user?.id, auth]);

  useEffect(() => {
    if (conversationsData) {
      dispatch(setConversations(conversationsData));
    }
  }, [conversationsData]);

  // console.log(conversations);

  return (
    <div className="h-[calc(100vh-110px)] overflow-hidden">
      <div className="text-2xl font-semibold">Chats</div>
      <div className="mt-4 h-full overflow-auto">
        {conversations.map((conversation: Conversation) => (
          <ChatItem key={conversation._id} conversation={conversation} />
        ))}
      </div>
    </div>
  );
}

export default Chats;
