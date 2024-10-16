import React, { useState } from "react";
import Button from "../Button";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import {
  changeSearchType,
  changeSearchInput,
  changeSkipSearch,
} from "../../store";
import Notification from "./Notification";
import NavBarDropdown from "./NavBarDropdown";
import { BsPencilSquare } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "../Dropdown";
import postApi from "../../store/apis/postApi";
import { userApi } from "../../store/apis/userApi";
import logo from "../../assets/logo.svg";
const NavBar = () => {
  const dispatch = useDispatch();
  const { searchType, input } = useSelector((state) => {
    return state.search;
  });

  const [show, setShow] = useState(false);
  const nav = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    setShow(false);
    if (input !== "") {
      dispatch(changeSkipSearch(false));
      nav(`/search/?search=${input}`);
    }

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
          <img className="w-full h-full" src={logo} alt="logo" />
          <h1 className="hidden md:block text-white font-bold text-2xl">
            Fremo
          </h1>
        </div>
        <form onSubmit={handleSubmit} className="flex w-1/3 h-9">
          <div>
            <Dropdown
              value={searchType}
              onChange={(option) => {
                dispatch(changeSearchType(option));
              }}
              options={options}
              className="hidden md:flex bg-topic-300 rounded-r-none z-10 h-9"
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
            className=" hidden md:block bg-topic-300 pl-2 focus:ring-0  w-full active:border-none rounded-r-l outline-none placeholder:text-topic-800"
            placeholder={
              searchType?.label ? `Search for ${searchType?.label}` : "search"
            }
            value={input}
          />
          <Button className="hidden md:block border-topic-700 w-10 rounded-r bg-topic-300  ">
            <HiMagnifyingGlass />
          </Button>
        </form>
        <div className="flex items-center gap-4 justify-between">
          <Button
            type="button"
            className="block md:hidden  w-10 rounded  border-none  p-0 "
            onClick={() => {
              setShow(!show);
            }}
          >
            <HiMagnifyingGlass className="w-full h-full text-white" />
          </Button>
          <Button
            onClick={() => {
              nav("/newPost");
            }}
            rounded
            className="h-14 w-14 border-none active:ring-0 active:scale-90"
          >
            <BsPencilSquare className="h-full w-full text-white" />
          </Button>
          <Notification />

          <NavBarDropdown />
        </div>
      </div>
      {show && (
        <form
          onSubmit={handleSubmit}
          className="block md:hidden absolute top-14 px-2 py-4 w-full bg-topic-100"
        >
          <div>
            <Dropdown
              value={searchType}
              onChange={(option) => {
                dispatch(changeSearchType(option));
              }}
              options={options}
              className="flex md:hidden bg-topic-200 rounded-r-none z-10 h-14"
              optClassname={"bg-topic-50 w-full"}
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
            className=" block md:hidden px-2 py-6 bg-topic-300 rounded-md text-lg focus:ring-0  w-full active:border-none rounded-r-l outline-none placeholder:text-topic-800"
            placeholder={
              searchType?.label ? `Search for ${searchType?.label}` : "search"
            }
            value={input}
          />
        </form>
      )}
    </div>
  );
};

export default NavBar;
