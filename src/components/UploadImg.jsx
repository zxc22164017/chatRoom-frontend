import React from "react";
import { CiImageOn } from "react-icons/ci";
const UploadImg = ({ handleImage, ...rest }) => {
  return (
    <label
      htmlFor="image"
      className={`h-10 w-10 hover:cursor-pointer hover:scale-110 active:scale-90 ${rest.className}`}
    >
      <input id="image" onChange={handleImage} type="file" className="hidden" />
      <CiImageOn className="w-full h-full text-gray-500" />
    </label>
  );
};
export default UploadImg;
