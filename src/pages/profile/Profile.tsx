import { Button, Image, Upload } from "antd";
import Navbar from "../../components/common/Navbar";
import Container from "../../components/common/Container";
import { UploadOutlined } from "@ant-design/icons";
import {
  useGetProfileDataQuery,
  useUploadProfilePictureMutation,
} from "../../services/profileApi";
import { useEffect, useState } from "react";
import Loader from "../../components/common/Loader";
import { RcFile, UploadFileStatus } from "antd/es/upload/interface";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { updateProfilePicture } from "../../store/authSlice";

function Profile() {
  const dispatch = useDispatch();
  const {
    isLoading: isProfileDataLoading,
    data: getProfileData,
    isError: isGetProfileDataError,
    error: getProfileDataError,
  } = useGetProfileDataQuery({});

  const [uploadProfilePicture, { data: uploadData }] =
    useUploadProfilePictureMutation();
  const [fileList, setFileList] = useState<UploadFileStatus[]>([]);

  useEffect(() => {
    if (isGetProfileDataError) {
      console.log(getProfileDataError);
    }
  }, [isGetProfileDataError]);

  const handleUpload = async (options: any) => {
    const { file } = options;

    const formData = new FormData();
    formData.append("profilePicture", file as RcFile);

    try {
      await uploadProfilePicture(formData).unwrap();
      toast.success("Profile picture uploaded successfully");
    } catch (error) {
      toast.error("Upload failed");
    }
  };

  useEffect(() => {
    if (uploadData) {
      dispatch(updateProfilePicture({ profilePicture: uploadData.filePath }));

      let values = localStorage.getItem("Chat-Application");

      if (values) {
        let parseValue = JSON.parse(values);
        parseValue.user.profilePicture = uploadData.filePath;

        localStorage.setItem("Chat-Application", JSON.stringify(parseValue));
      }
    }
  }, [uploadData]);

  const uploadProps = {
    customRequest: handleUpload,
    listType: "picture",
    maxCount: 1,
    fileList,
    onChange: () => {
      setFileList(fileList);
    },
  };

  return (
    <div>
      <Navbar />
      <Container>
        {isProfileDataLoading ? (
          <Loader />
        ) : (
          <div className="max-w-md mx-auto p-4">
            <div className="flex justify-center flex-col gap-2">
              <Image
                className="max-w-[200px] mx-auto"
                src={`${import.meta.env.VITE_API_IMAGES_URL}/${
                  getProfileData?.profilePicture
                }`}
              />
              <Upload className="mx-auto" {...uploadProps}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </div>

            <div className="text-center mt-4">
              <div className="text-2xl font-semibold">
                {getProfileData?.fullname}
              </div>
              <div className="text-gray">@{getProfileData?.username}</div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}

export default Profile;
