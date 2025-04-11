import { Avatar } from "antd";
import { Link } from "react-router-dom";
import { Conversation } from "../types/types";
import { useSelector } from "react-redux";

function ChatItem({ conversation }: { conversation: Conversation }) {
  const recipientId = conversation.recipient._id;
  const recipient = useSelector((state) => (state as any).recipient);

  return (
    <Link to={`/messages/${conversation.recipient._id}`}>
      <div
        className={`p-2 rounded flex gap-3 items-center cursor-pointer ${
          recipientId == recipient._id ? "bg-orange-100" : ""
        }`}
      >
        <div className="relative">
          <Avatar
            size="large"
            src={`${import.meta.env.VITE_API_IMAGES_URL}/${
              conversation.recipient.profilePicture
            }`}
          />
          {conversation.recipient.isOnline && (
            <div className="absolute w-3 h-3 bg-green-400 rounded-full bottom-1 right-0"></div>
          )}
        </div>
        <div>
          <div className="font-semibold text-lg">
            {conversation.recipient.fullname}
          </div>
          <div className="text-gray">{conversation?.lastMessage?.text}</div>
        </div>
      </div>
    </Link>
  );
}

export default ChatItem;
