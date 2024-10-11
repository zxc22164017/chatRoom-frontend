import React, { useState, useCallback } from "react";
import Input from "../Input";

import useDeBounce from "../../hooks/useDeBounce";
import { useSearchUsersQuery } from "../../store";
import UserTemplate from "../UserTemplate";

export function SearchUsers({ setSelectUser, selectUser, existUsers }) {
  const [search, setSearch] = useState("");
  const [skipSearch, setSkipSearch] = useState(true);
  const result = useSearchUsersQuery(
    { search, page: 0 },
    { skip: skipSearch || search === "" }
  );
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

  const renderExistedUsers =
    existUsers &&
    existUsers.map((item) => {
      return (
        <div
          key={item._id}
          className=" p-1 hover:cursor-pointer rounded-full text-green-700 bg-emerald-200"
        >
          {item.username}
        </div>
      );
    });

  const handleSearch = (e) => {
    setSearch(e.target.value);
    deBounce(e.target.value);
  };
  return (
    <>
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
    </>
  );
}
