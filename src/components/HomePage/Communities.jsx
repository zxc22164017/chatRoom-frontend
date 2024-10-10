import React, { useState } from "react";
import { useGetCommunitiesQuery } from "../../store";
import { RiGroup2Line } from "react-icons/ri";
import ExpandablePanel from "../ExpandablePanel";
import Thumbnail from "../Thumbnails/Thumbnail";
import Drawer from "../drawer";
import { useNavigate } from "react-router-dom";

const Communities = () => {
  const nav = useNavigate();
  const { data, isLoading, error } = useGetCommunitiesQuery();
  const [show, setShow] = useState(false);
  const header = (
    <>
      <RiGroup2Line className="w-full h-full md:h-8 md:w-8 mx-2 text-violet-500" />
      <h1 className="hidden md:block text-xl ">Communities</h1>
    </>
  );
  let communities;
  if (data) {
    communities = data.map((community) => {
      return (
        <div
          onClick={() => {
            nav(`/c/${community.name}`);
            setShow(false);
          }}
          key={community._id}
          className="  h-14 px-2 flex items-center rounded-md hover:bg-topic-300 hover:cursor-pointer"
        >
          <Thumbnail className={"h-10 w-10 "} image={community.icon} />
          <h2 className="mx-2 text-slate-600">{community.name}</h2>
        </div>
      );
    });
  }

  return (
    <>
      <ExpandablePanel
        header={header}
        outerClassName={"hidden md:block border-t-2 "}
        headerClassName={"p-0 hover:bg-topic-300 h-20 md:p-4"}
      >
        {communities}
      </ExpandablePanel>
      <div
        onClick={() => {
          setShow(true);
        }}
        className="flex md:hidden items-center w-full h-20 md:p-4   hover:cursor-pointer hover:bg-topic-300"
      >
        <RiGroup2Line className=" w-full h-full md:h-8 md:w-8 mx-2 text-violet-500" />
      </div>
      {show && (
        <Drawer setShow={setShow}>
          <h1 className=" text-xl ">Communities</h1>
          {communities}
        </Drawer>
      )}
    </>
  );
};

export default Communities;
