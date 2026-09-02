// import { API_PATHS } from "./apipaths.js";
// import axiosInstance from "./axiosinstance.js";

// const uploadImage = async (imageFile) => {
//   const formData = new FormData();

//   formData.append("image", imageFile);

//   try {
//     const response = await axiosInstance.post(
//       API_PATHS.IMAGE.UPLOAD_IMAGE,
//       formData
//     );

//     return response.data;
//   } catch (error) {
//     if (error.response && error.response.data.message) {
//       throw new Error(error.response.data.message);
//     } else {
//       throw new Error("Image upload failed");
//     }
//   }
// };

// export default uploadImage;


import { API_PATHS } from "./apipaths.js";
import axiosInstance from "./axiosinstance.js";

const uploadImage = async (imageFile) => {
  const formData = new FormData();

  formData.append("image", imageFile);

  try {
    const response = await axiosInstance.post(
      API_PATHS.IMAGE.UPLOAD_IMAGE,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Image upload failed"
    );
  }
};

export default uploadImage;