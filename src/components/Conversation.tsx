import { PaperClipOutlined, SendOutlined } from "@ant-design/icons";
import { Button, Input, Upload } from "antd";
import MainLayout from "../layouts/MainLayout";
import {
  useGetMessagesByRecipientIdQuery,
  useGetRecipientProfileQuery,
} from "../services/userApi";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRecipient, updateActiveStatus } from "../store/recipientSlice";
import { appendToInbox, setInbox } from "../store/inboxSlice";
import { Message as MessageType } from "../types/types";
import { socket } from "../App";
import { updateLastMessage } from "../store/conversationsSlice";

function Conversation() {
  const { recipientId } = useParams();
  const dispatch = useDispatch();
  const recipient = useSelector((state: any) => state.recipient);
  const inbox = useSelector((state: any) => state.inbox);
  const [messageInput, setMessageInput] = useState("");
  const messageContainerRef = useRef<HTMLDivElement | null>(null);

  const {
    data: recipientData,
    isError,
    error,
  } = useGetRecipientProfileQuery(recipientId, {
    skip: !recipientId,
  });

  const {
    data: messagesData,
    isError: isMessagesError,
    error: messagesError,
  } = useGetMessagesByRecipientIdQuery(recipientId);

  useEffect(() => {
    if (isError) {
      console.log(error);
    }
  }, [isError, error]);

  useEffect(() => {
    if (isMessagesError) {
      console.log(messagesError);
    }
  }, [isMessagesError, messagesError]);

  useEffect(() => {
    if (recipientData) {
      dispatch(
        setRecipient({
          _id: recipientData.data._id,
          fullname: recipientData.data.fullname,
          isOnline: recipientData.data.isOnline,
        })
      );
    }
  }, [recipientData]);

  useEffect(() => {
    if (messagesData) {
      dispatch(setInbox(messagesData.messages));
    }
  }, [messagesData]);

  useEffect(() => {
    socket.on("userStatusChanged", ({ userId, isOnline }) => {
      console.log(userId);

      dispatch(updateActiveStatus({ isOnline }));
    });

    return () => {
      socket.off("userStatusChanged");
    };
  }, []);

  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef?.current.scrollTo({
        top: messageContainerRef?.current.scrollHeight + 150,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    socket.on("messageReceived", (message) => {
      dispatch(appendToInbox(message));
      scrollToBottom();
      // set last message
    });

    socket.on("messageSent", (message) => {
      console.log(message.sender);

      dispatch(appendToInbox(message));
      // set last message
      dispatch(
        updateLastMessage({
          _id: message.conversationId,
          lastMessage: message,
        })
      );

      scrollToBottom();
    });
  }, [socket]);

  const sendMessage = () => {
    socket.emit("sendMessage", { recipientId, text: messageInput });
    setMessageInput("");
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  return (
    <MainLayout>
      <div className="relative h-[calc(100vh-110px)] overflow-hidden">
        <div className="font-semibold m-2">
          <div className="font-semibold text-lg">{recipient.fullname}</div>
          {recipient.isOnline ? (
            <div className="text-green-500">online</div>
          ) : (
            <div className="text-red-500">offline</div>
          )}
        </div>
        <div className="h-[370px] overflow-auto" ref={messageContainerRef}>
          <Messages inbox={inbox} />
        </div>

        <div className="w-full flex gap-2 absolute bottom-0 py-2 bg-white">
          <Upload>
            <Button size="large" icon={<PaperClipOutlined />} />
          </Upload>

          <Input
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Type a message"
            className="flex-1"
            size="large"
          />

          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={sendMessage}
            size="large"
          />
        </div>
      </div>
    </MainLayout>
  );
}

function Messages({ inbox }: { inbox: MessageType[] }) {
  const auth = useSelector((state: any) => state.auth);

  return (
    <div className="p-2">
      {inbox.map((message) => (
        <Message
          key={message._id}
          text={message.text}
          self={message.sender == auth.user.id}
        />
      ))}
    </div>
  );
}

function Message({ self, text }: { self?: boolean; text: string }) {
  return (
    <div className={`flex my-2 ${self ? "justify-end" : "justify-start"}`}>
      <div
        className={`py-2 px-4 rounded-md max-w-[70%] ${
          self ? "bg-primary text-white" : "bg-slate-100"
        }`}
      >
        <div>{text}</div>
      </div>
    </div>
  );
}

export default Conversation;
