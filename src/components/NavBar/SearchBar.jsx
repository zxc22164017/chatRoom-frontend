import React, { useCallback, useEffect, useState } from "react";
import Dropdown from "../Dropdown";
import postApi from "../../store/apis/postApi";
import { userApi } from "../../store/apis/userApi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { HiMagnifyingGlass } from "react-icons/hi2";
import Button from "../Button";
import {
  changeSearchType,
  changeSearchInput,
  changeSkipSearch,
  changeSearchPage,
  changeNoMore,
  useSearchUsersQuery,
  useSearchPostQuery,
} from "../../store";
import useDeBounce from "../../hooks/useDeBounce";
import ResultPanel from "./ResultPanel";
const SearchBar = ({ setShow, show }) => {
  const location = useLocation();
  const nav = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { searchType, input, skipSearch } = useSelector((state) => {
    return state.search;
  });
  const userResult = useSearchUsersQuery(
    { search: input, page: 0 },
    { skip: skipSearch || input === "" || searchType.value !== "users" }
  );
  const postResult = useSearchPostQuery(
    { search: input, page: 0 },
    { skip: skipSearch || input === "" || searchType.value !== "posts" }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setShow(false);
    if (input !== "") {
      dispatch(changeSkipSearch(false));
      dispatch(changeSearchPage(0));
      dispatch(changeNoMore(false));
      nav(`/search/?search=${input}`);
    }

    //submmit form data to query user;
  };
  const dispatch = useDispatch();
  const deBounce = useCallback(
    useDeBounce((input) => {
      if (input !== "") {
        dispatch(changeSearchPage(0));
        dispatch(changeSkipSearch(false));
      }
    }, 500),
    [useDeBounce]
  );

  const options = [
    { label: "posts", value: "posts" },
    { label: "users", value: "users" },
  ];

  const handleInput = (e) => {
    dispatch(
      postApi.util.invalidateTags([
        {
          type: "search",
          id: "search",
        },
      ])
    );
    dispatch(
      userApi.util.invalidateTags([
        {
          type: "search",
          id: "search",
        },
      ])
    );
    dispatch(changeSkipSearch(true));
    dispatch(changeSearchInput(e.target.value));
    deBounce(e.target.value);
  };

  useEffect(() => {
    if (location.pathname !== "/search/") {
      if (userResult.isSuccess || postResult.isSuccess) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    }
  }, [userResult, postResult, location]);

  return (
    <>
      <div className="w-1/3 relative">
        <form onSubmit={handleSubmit} className="flex h-9">
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
            onChange={handleInput}
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
        {isOpen && (
          <ResultPanel
            className={"hidden md:block absolute"}
            userData={userResult?.data}
            postData={postResult?.data}
            setShow={setIsOpen}
          />
        )}
      </div>
      {show && (
        <form
          onSubmit={handleSubmit}
          className="block md:hidden absolute w-full top-14 px-2 py-4 bg-topic-100"
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
    </>
  );
};

export default SearchBar;
