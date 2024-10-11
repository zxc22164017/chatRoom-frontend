import React, { useState } from "react";
import Input from "../Input";
import Button from "../Button";
import ThumbnailWithPreview from "../Thumbnails/ThumbnailWithPreview";

const Page02 = ({ handleNextPage, handleLastPage, setFormData, formData }) => {
  return (
    <form>
      <h1 className="font-bold font-sans text-2xl mb-4">Set up your profile</h1>

      <Input
        type={"text"}
        text={"username"}
        value={formData.username}
        onChange={(e) => {
          setFormData({ ...formData, username: e.target.value });
        }}
      />
      <div className="flex justify-between mt-6">
        <Button secondary rounded className="w-1/2" onClick={handleLastPage}>
          pre
        </Button>
        <Button primary rounded className="w-1/2 mx-2" onClick={handleNextPage}>
          next
        </Button>
      </div>
    </form>
  );
};

export default Page02;
