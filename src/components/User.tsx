import { Avatar } from "antd";
import { Link } from "react-router-dom";

interface User {
  id: string;
  username: string;
  fullname: string;
  profilePicture: string;
}

function User({ id, username, fullname, profilePicture }: User) {
  return (
    <Link to={`/messages/${id}`}>
      <div className="flex items-center py-4 px-2 gap-3">
        <Avatar
          size="large"
          src={`${import.meta.env.VITE_API_IMAGES_URL}/${profilePicture}`}
        />
        <div className="flex flex-col">
          <div className="font-semibold text-lg">{fullname}</div>
          <div className="text-gray">@{username}</div>
        </div>
      </div>
    </Link>
  );
}

export default User;
