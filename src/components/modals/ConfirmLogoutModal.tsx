import { useDispatch } from "react-redux";
import { ModalProps } from "../../types/modal";
import CustomModal from "../common/CustomModal";
import { Button, Space } from "antd";
import { userLogout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

function ConfirmLogoutModal({ open, handleClose }: ModalProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(userLogout());
    localStorage.removeItem("Chat-Application");
    navigate("/auth/signin");
  };

  return (
    <CustomModal title="Confirm Logout" open={open} handleClose={handleClose}>
      <div>Are you sure you want to proceed?</div>
      <Space className="flex justify-end">
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="primary" onClick={handleLogout}>
          Logout
        </Button>
      </Space>
    </CustomModal>
  );
}

export default ConfirmLogoutModal;
