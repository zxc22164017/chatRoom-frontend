import React, { useState } from "react";
import Button from "../Button";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import {
  changeSearchType,
  changeSearchInput,
  changeSkipSearch,
} from "../../store";
import NavBarDropdown from "./NavBarDropdown";
import { BsPencilSquare } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "../Dropdown";
import postApi from "../../store/apis/postApi";
import { userApi } from "../../store/apis/userApi";
const NavBar = () => {
  const dispatch = useDispatch();
  const { searchType, input } = useSelector((state) => {
    return state.search;
  });

  const nav = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(changeSkipSearch(false));
    nav(`/search/?search=${input}`);

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
        <form onSubmit={handleSubmit} className="flex w-1/3 h-9">
          <div>
            <Dropdown
              value={searchType}
              onChange={(option) => {
                dispatch(changeSearchType(option));
              }}
              options={options}
              className="bg-topic-300 rounded-r-none z-10 h-9"
              optClassname={"bg-topic-300"}
            />
          </div>
          <input
            type="text"
            onChange={(e) => {
              dispatch(
                postApi.util.invalidateTags([{ type: "search", id: "search" }])
              );
              dispatch(
                userApi.util.invalidateTags([{ type: "search", id: "search" }])
              );
              dispatch(changeSkipSearch(true));
              dispatch(changeSearchInput(e.target.value));
            }}
            className="bg-topic-300 pl-2 focus:ring-0  w-full active:border-none rounded-r-l outline-none placeholder:text-topic-800"
            placeholder={
              searchType?.label ? `Search for ${searchType?.label}` : "search"
            }
            value={input}
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
