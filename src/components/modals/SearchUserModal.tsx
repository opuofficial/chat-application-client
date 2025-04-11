import { Input } from "antd";
import { ModalProps } from "../../types/modal";
import CustomModal from "../common/CustomModal";
import Loader from "../common/Loader";
import { useEffect, useState } from "react";
import User from "../User";
import { useSearchUserQuery } from "../../services/userApi";
import { useNavigate } from "react-router-dom";

function SearchUserModal({ open, handleClose }: ModalProps) {
  const [searchKeyword, setSearchKeyword] = useState("");
  const navigate = useNavigate();
  const [initialRender, setInitialRender] = useState(true);
  const {
    isLoading,
    data: usersData,
    isError,
    error,
  } = useSearchUserQuery(
    { keyword: searchKeyword.trim() },
    { skip: !searchKeyword.trim() }
  );

  useEffect(() => {
    if (open && !initialRender) {
      handleClose();
    }

    if (initialRender) {
      setInitialRender(false);
    }
  }, [navigate]);

  useEffect(() => {
    if (isError) {
      console.log(error);
    }
  }, [isError]);

  return (
    <CustomModal title="" open={open} handleClose={handleClose}>
      <div className="mt-8 h-[350px] overflow-hidden text-default">
        <Input
          size="large"
          placeholder="Search with fullname or username"
          onChange={(e) => setSearchKeyword(e.target.value)}
        />

        <div className="mt-2 h-full overflow-auto pb-10">
          {isLoading ? (
            <Loader />
          ) : usersData?.users?.length ? (
            usersData.users.map((user) => (
              <User
                key={user._id}
                id={user._id}
                username={user.username}
                fullname={user.fullname}
                profilePicture={user.profilePicture}
              />
            ))
          ) : searchKeyword.trim() ? (
            <div className="text-slate-500 text-center my-6">
              No users found!
            </div>
          ) : (
            <div className="text-slate-500 text-center my-6">
              Type to search for users
            </div>
          )}
        </div>
      </div>
    </CustomModal>
  );
}

export default SearchUserModal;
