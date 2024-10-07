import React, { useState } from "react";
import Button from "../Button";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import {
  useSearchUsersMutation,
  useSearchPostMutation,
  changeSearchType,
} from "../../store";
import NavBarDropdown from "./NavBarDropdown";
import { BsPencilSquare } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "../Dropdown";
const NavBar = () => {
  const [searchUsers, results] = useSearchUsersMutation({
    fixedCacheKey: "searchUser",
  });
  const [searchPosts, postResults] = useSearchPostMutation({
    fixedCacheKey: "searchPost",
  });
  const dispatch = useDispatch();
  const searchType = useSelector((state) => {
    return state.searchType;
  });

  const [search, SetSearch] = useState("");
  const nav = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchType?.value === "users") {
      searchUsers({ search });
    } else if (searchType?.value === "posts") {
      searchPosts({ search });
    } else {
      searchUsers({ search });
      searchPosts({ search });
    }
    nav(`/search/?search=${search}`);
    SetSearch("");
    //submmit form data to query user;
  };
  const options = [
    { label: "posts", value: "posts" },
    { label: "users", value: "users" },
  ];

  return (
    <div className="fixed w-full top-0 z-20">
      <div className="bg-topic-900 h-14 shadow-lg flex justify-between items-center ">
        <div
          className="flex pl-10 justify-end hover:cursor-pointer"
          onClick={() => {
            nav("/");
          }}
        >
          <h1 className="text-white font-bold text-2xl">Logo </h1>
        </div>
        <form onSubmit={handleSubmit} className="flex w-1/3">
          <div>
            <Dropdown
              value={searchType}
              onChange={(option) => {
                dispatch(changeSearchType(option));
              }}
              options={options}
              className="bg-topic-300 rounded-r-none z-10"
              optClassname={"bg-topic-300"}
            />
          </div>
          <input
            type="text"
            onChange={(e) => {
              SetSearch(e.target.value);
            }}
            className="bg-topic-300 pl-2 focus:ring-0  w-full active:border-none rounded-r-l outline-none placeholder:text-topic-800"
            placeholder={
              searchType?.label ? `Search for ${searchType?.label}` : "search"
            }
            value={search}
          />
          <Button className="border-topic-700 w-10 rounded-r bg-topic-300  ">
            <HiMagnifyingGlass />
          </Button>
        </form>
        <div className="flex items-center gap-4 justify-between">
          <Button
            onClick={() => {
              nav("/newPost");
            }}
            rounded
            className="h-14 w-14 border-none active:ring-0 active:scale-90"
          >
            <BsPencilSquare className="h-full w-full text-white" />
          </Button>

          <NavBarDropdown />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
