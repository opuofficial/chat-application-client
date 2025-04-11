import Container from "./Container";
import { Avatar, Button, Dropdown, Space } from "antd";
import SearchIcon from "../../assets/icons/SearchIcon";
import SearchUserModal from "../modals/SearchUserModal";
import { useModal } from "../../hooks/useModal";
import UserIcon from "../../assets/icons/UserIcon";
import LogoutIcon from "../../assets/icons/LogoutIcon";
import ConfirmLogoutModal from "../modals/ConfirmLogoutModal";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

function Navbar() {
  const { open, modalType, handleOpen, handleClose } = useModal();
  const auth = useSelector((state: RootState) => state.auth);

  return (
    <section className="text-default border-b">
      <Container>
        <div className="flex justify-between items-center">
          <div>
            <Button size="large" onClick={() => handleOpen("SEARCH_USER")}>
              <SearchIcon />
            </Button>
          </div>
          <div>
            <Dropdown
              menu={{
                items: [
                  {
                    label: (
                      <Link to="/profile" className="flex gap-2 items-center">
                        <UserIcon />
                        <div>Profile</div>
                      </Link>
                    ),
                    key: "0",
                  },
                  {
                    label: (
                      <div
                        className="flex gap-2 items-center"
                        onClick={() => handleOpen("LOG_OUT")}
                      >
                        <LogoutIcon />
                        <div>Logout</div>
                      </div>
                    ),
                    key: "1",
                  },
                ],
              }}
              trigger={["click"]}
            >
              <Space className="cursor-pointer">
                <Avatar
                  size="large"
                  src={`${import.meta.env.VITE_API_IMAGES_URL}/${
                    auth.user.profilePicture
                  }`}
                />
                <span className="font-bold ml-2">{auth.user.username}</span>
              </Space>
            </Dropdown>
          </div>
        </div>
      </Container>

      {modalType === "SEARCH_USER" && (
        <SearchUserModal open={open} handleClose={handleClose} />
      )}

      {modalType === "LOG_OUT" && (
        <ConfirmLogoutModal open={open} handleClose={handleClose} />
      )}
    </section>
  );
}

export default Navbar;
