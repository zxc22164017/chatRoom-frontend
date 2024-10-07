import React, { useState, useCallback } from "react";
import Modal from "../components/Modal";
import Input from "../components/Input";
import Button from "../components/Button";
import { useAddRoomMutation, useSearchUsersMutation } from "../store";
import useDeBounce from "../hooks/useDeBounce";
import UserTemplate from "../components/UserTemplate";
import useGetLoginInfo from "../hooks/useGetLoginInfo";

const ChatRoomModal = ({ onChange }) => {
  const currentUser = useGetLoginInfo();
  const [search, setSearch] = useState("");
  const [searchUser, result] = useSearchUsersMutation();
  const [addRoom, addResult] = useAddRoomMutation();
  const [selectUser, setSelectUser] = useState([]);
  const [name, setName] = useState("");
  const deBounce = useCallback(
    useDeBounce((search) => {
      if (search !== "") {
        searchUser(search);
      }
    }, 1000),
    [useDeBounce]
  );
  const handleSelect = (user) => {
    setSelectUser([...selectUser, { _id: user._id, username: user.username }]);
    setSearch("");
  };
  const handleDelete = (user) => {
    const result = selectUser.filter((item) => {
      if (item._id !== user._id) return item;
    });
    setSelectUser(result);
  };

  let renderSearchResult;
  if (result.data) {
    let filteredArray = [];
    if (selectUser.length === 0) {
      filteredArray = result.data.filter((item) => {
        if (item._id === currentUser._id) {
          return;
        }
        return item;
      });
    } else {
      filteredArray = result.data.filter((item) => {
        for (let i = 0; i < selectUser.length; i++) {
          if (selectUser[i]._id === item._id) {
            return;
          }
        }

        if (item._id === currentUser._id) {
          return;
        }
        return item;
      });
    }
    renderSearchResult = filteredArray.map((user) => {
      return (
        <UserTemplate
          className={"p-2 mx-0"}
          key={user._id}
          name={user.username}
          onClick={() => {
            handleSelect(user);
          }}
        />
      );
    });
  }

  const handleSearch = (e) => {
    setSearch(e.target.value);
    deBounce(e.target.value);
  };
  const renderSelect = selectUser.map((item) => {
    return (
      <div
        key={item._id}
        onClick={() => {
          handleDelete(item);
        }}
        className=" p-1 hover:cursor-pointer rounded-full text-sky-600 bg-blue-200"
      >
        {item.username}
      </div>
    );
  });
  const handlSubmit = (e) => {
    e.preventDefault();

    const users = selectUser.map((user) => user._id);
    users.push(currentUser._id);
    addRoom({ users, name });
    onChange();
  };

  return (
    <Modal onChange={onChange}>
      <form
        onSubmit={handlSubmit}
        className="flex flex-col w-full items-center"
      >
        <h1 className="font-bold ">New chat room</h1>
        <div className="border-t-2 mt-2 w-full flex items-center border-collapse">
          <h1>Name:</h1>
          <Input
            className="border-none mt-0"
            value={name}
            placeholder="Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></Input>
        </div>
        <div className="border-y-2 w-full  flex items-center ">
          <h1>With:</h1>
          <div className="flex flex-wrap"> {renderSelect}</div>
          <Input
            value={search}
            onChange={handleSearch}
            className={"rounded-none  border-none mt-0 "}
            placeholder="Search..."
          />
        </div>
        <div className="h-[340px] flex flex-col flex-grow">
          {renderSearchResult}
        </div>
        <Button primary rounded>
          Chat
        </Button>
      </form>
    </Modal>
  );
};

export default ChatRoomModal;
