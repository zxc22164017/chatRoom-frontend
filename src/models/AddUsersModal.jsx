import React, { useState, useCallback, useEffect } from "react";
import Modal from "../components/Modal";
import Input from "../components/Input";
import Button from "../components/Button";
import {
  useGetSingleRoomQuery,
  useSearchUsersQuery,
  usePatchRoomMutation,
} from "../store";
import useDeBounce from "../hooks/useDeBounce";
import UserTemplate from "../components/UserTemplate";
import { useParams } from "react-router-dom";

const AddUsersModal = ({ onChange }) => {
  const { _id } = useParams();
  const [search, setSearch] = useState("");
  const [skipSearch, setSkipSearch] = useState(true);
  const result = useSearchUsersQuery(
    { search, page: 0 },
    { skip: skipSearch || search === "" }
  );
  const [patchRoom, patchResult] = usePatchRoomMutation();
  const { data, error, isLoading } = useGetSingleRoomQuery(_id);
  const [selectUser, setSelectUser] = useState([]);
  const deBounce = useCallback(
    useDeBounce((search) => {
      if (search !== "") {
        setSkipSearch(false);
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
        return item;
      });
    } else {
      filteredArray = result.data.filter((item) => {
        for (let i = 0; i < selectUser.length; i++) {
          if (selectUser[i]._id === item._id) {
            return;
          }
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
  const renderExistedUsers = data?.users.map((item) => {
    return (
      <div
        key={item._id}
        className=" p-1 hover:cursor-pointer rounded-full text-green-700 bg-emerald-200"
      >
        {item.username}
      </div>
    );
  });
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
    const existUsers = data.users;
    const uploadUsers = [...selectUser, ...existUsers];

    patchRoom({ users: uploadUsers, roomId: _id });
    onChange();
  };

  return (
    <Modal onChange={onChange}>
      <form
        onSubmit={handlSubmit}
        className="flex flex-col w-full items-center"
      >
        <h1 className="font-bold ">Add Users</h1>
        <div className="border-t-2 mt-2 w-full flex items-center border-collapse">
          <h1 className="py-3">Name: {data?.name}</h1>
        </div>
        <div className="border-y-2 w-full  flex items-center ">
          <h1>With:</h1>
          <div className="flex flex-wrap">
            {renderExistedUsers} {renderSelect}
          </div>
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
          Add
        </Button>
      </form>
    </Modal>
  );
};

export default AddUsersModal;
