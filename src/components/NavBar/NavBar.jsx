import React, { useState } from "react";
import Button from "../Button";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useSearchUsersMutation } from "../../store";
import NavBarDropdown from "./NavBarDropdown";
import { BsPencilSquare } from "react-icons/bs";
function NavBar() {
  const [searchUsers, results] = useSearchUsersMutation({
    fixedCacheKey: "search",
  });

  //set user dropDown

  const [search, SetSearch] = useState("");
  const nav = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    SetSearch("");
    searchUsers(search);
    nav(`/?search=${search}`);
    //submmit form data to query user;
  };

  return (
    <div className="fixed w-full top-0 z-10">
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
          <input
            type="text"
            onChange={(e) => {
              SetSearch(e.target.value);
            }}
            className="bg-topic-300 pl-2 focus:ring-0  w-full active:border-none rounded-l placeholder:text-topic-800"
            placeholder="Search for Users"
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
}

export default NavBar;
