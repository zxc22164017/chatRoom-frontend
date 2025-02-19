import { useEffect, useState } from "react";
import Thumbnail from "../Thumbnails/Thumbnail";
import Button from "../Button";
import { FaInfoCircle } from "react-icons/fa";
import RuleDrawer from "../CreatePostPage/RuleDrawer";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleCommunityQuery } from "../../store";
import LoadingFancy from "../Loading/LoadingFancy";
import { IoIosArrowDown } from "react-icons/io";
import PostSection from "./PostSection";
import useGetLoginInfo from "../../hooks/useGetLoginInfo";

const MainContent = () => {
  const currentUser = useGetLoginInfo();
  const nav = useNavigate();
  const { name } = useParams();
  const { data, error, isLoading } = useGetSingleCommunityQuery(name);
  const [show, setShow] = useState(false);
  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    if (currentUser && data) {
      const managers = data?.managers;
      let c = 0;
      if (currentUser.identity === "admin") {
        c += 1;
      } else if (managers) {
        managers.forEach((user) => {
          if (user._id === currentUser._id) c += 1;
        });
      }

      if (c !== 0) {
        setAdmin(true);
      }
    }
  }, [currentUser, data]);

  let content;
  if (isLoading) {
    content = (
      <div className="w-full h-full flex justify-center items-center">
        <LoadingFancy />
      </div>
    );
  } else if (data) {
    content = (
      <>
        <div className="relative">
          <Thumbnail
            image={data?.banner}
            alt={`${data.name} banner`}
            className={
              "bg-gray-700 h-48 md:h-64  rounded-sm ml-0 ring-0 hover:cursor-auto"
            }
          />
          <Thumbnail
            image={data?.icon}
            alt={`${data.name} icon`}
            className={
              "absolute w-20 h-20 md:w-36 md:h-36 -bottom-10 md:-bottom-[72px] left-4 hover:cursor-auto"
            }
          />
        </div>
        <div className="flex h-20 mb-4 items-center justify-between">
          <h1 className="text-lg md:text-4xl ml-40 font-bold">{data.name}</h1>
          <Button
            type="button"
            onClick={() => {
              setShow(true);
            }}
            className="h-10 w-18 flex items-center text-gray-400 border-none active:ring-0 mr-4 hover:text-blue-400 transition-all duration-100"
          >
            <FaInfoCircle className="h-5 w-5 pr-1" />
            <p className="hidden md:block  text-lg ">rules</p>
          </Button>
          {show && (
            <RuleDrawer
              setShow={setShow}
              community={data}
              managers={data.managers}
            />
          )}
        </div>
        <div className="group overflow-hidden  shadow-md  h-9 px-2 hover:h-40 transition-all duration-300 ease-in-out  ">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <h2 className="text-xl">Description</h2>
              <IoIosArrowDown className="text-center h-full group-hover:rotate-90 transition-all duration-300" />
            </div>
            {admin && (
              <div className="flex self-end gap-2">
                <Button
                  rounded
                  primary
                  className="w-36 h-8 "
                  onClick={() => {
                    nav(`/editCommunity/${data.name}`);
                  }}
                >
                  Edit Community
                </Button>
              </div>
            )}
          </div>
          <p className="w-full mt-1 h-4/5 text-slate-500">{data.description}</p>
        </div>
        <PostSection communityId={data._id} />
      </>
    );
  } else if (error) {
    console.log(error);
  }

  return (
    <div className="bg-white ml-14 xl:mx-96 min-w-sm flex flex-grow flex-col mt-14">
      {content}
    </div>
  );
};

export default MainContent;
