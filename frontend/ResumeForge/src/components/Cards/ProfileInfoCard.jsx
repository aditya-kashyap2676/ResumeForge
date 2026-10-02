import React, { useContext, useRef, useState } from "react";
import { UserContext } from "../../context/useContext";
import { useNavigate } from "react-router-dom";
import { LuCamera, LuUser } from "react-icons/lu";
import toast from "react-hot-toast";
import { normalizeImageUrl } from "../../Utils/helper";
import axiosInstance from "../../Utils/axiosinstance";
import { API_PATHS } from "../../Utils/apipaths";

const ProfileInfoCard = () => {
  const { user, clearUser, updateUser } = useContext(UserContext);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/");
  };

  const handleProfileImageChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const response = await axiosInstance.put(
        API_PATHS.AUTH.UPDATE_PROFILE_IMAGE,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      updateUser({ ...user, profileImageUrl: response.data.profileImageUrl });
      setImageFailed(false);
      toast.success("Profile photo updated");
    } catch (error) {
      toast.error(error.response?.data?.message || "Profile photo upload failed");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  if (!user) return null;

  const profileImageUrl = normalizeImageUrl(user.profileImageUrl);

  return (
    <div className="flex items-center">
      <div className="relative mr-3 h-11 w-11 shrink-0">
        {profileImageUrl && !imageFailed ? (
          <img
            src={profileImageUrl}
            alt="Profile"
            onError={() => setImageFailed(true)}
            className="h-11 w-11 rounded-full bg-gray-200 object-cover"
          />
        ) : (
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-200 text-gray-600">
            <LuUser aria-hidden="true" />
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={handleProfileImageChange}
        />
        <button
          type="button"
          title="Change profile photo"
          aria-label="Change profile photo"
          disabled={uploading}
          onClick={() => fileInputRef.current?.click()}
          className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-black text-white disabled:opacity-60"
        >
          <LuCamera size={13} />
        </button>
      </div>

      <div>
        <div className="text-[15px] font-bold leading-3">
          {user.name || ""}
        </div>

        <button
          type="button"
          className="text-purple-500 text-sm font-semibold cursor-pointer hover:underline"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfoCard;