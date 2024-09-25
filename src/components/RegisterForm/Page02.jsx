import React from "react";
import Input from "../Input";
import Button from "../Button";

const Page02 = ({ handleNextPage, handleLastPage, setFormData, formData }) => {
  return (
    <form>
      <h1 className="font-bold font-sans text-2xl mb-4">Set up your profile</h1>
      <div className="mx-auto w-48 h-48 relative  border-4 border-topic rounded-full overflow-hidden">
        <img
          className="object-cover object-center h-full"
          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
          alt="profile"
        />
      </div>
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
