import { useState } from "react";
import { useGetCommunitiesQuery } from "../../store";
import { RiGroup2Line } from "react-icons/ri";
import ExpandablePanel from "../ExpandablePanel";
import Thumbnail from "../Thumbnails/Thumbnail";
import Drawer from "../Drawer.jsx";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Communities = () => {
  const nav = useNavigate();
  const { data } = useGetCommunitiesQuery();
  const [show, setShow] = useState(false);
  const header = (
    <>
      <RiGroup2Line className="h-8 w-8  text-violet-500" />
      <h1 className="hidden group-hover:block text-xl ">Communities</h1>
    </>
  );
  const listAnimation = {
    hidden: { opacity: 0 },
    visible: (index) => ({
      opacity: 1,
      transition: { delay: index * 0.3 },
    }),
  };

  let communities;
  if (data) {
    communities = data.map((community, index) => {
      return (
        <motion.li
          custom={index}
          variants={listAnimation}
          onClick={() => {
            nav(`/c/${community.name}`);
            setShow(false);
          }}
          key={community._id}
          className="  h-14  flex items-center rounded-md hover:bg-sky-100 hover:cursor-pointer"
        >
          <Thumbnail className={"h-8 w-8 "} image={community.icon} />
          <h2 className="mx-2 xl:hidden group-hover:block text-slate-600">
            {community.name}
          </h2>
        </motion.li>
      );
    });
  }

  return (
    <>
      <ExpandablePanel
        header={header}
        outerClassName={"hidden xl:block border-t-2 "}
        headerClassName={"p-0 hover:bg-sky-100 h-20"}
      >
        {communities}
      </ExpandablePanel>
      <div
        onClick={() => {
          setShow(true);
        }}
        className="flex xl:hidden items-center w-full h-20 xl:p-4   hover:cursor-pointer hover:bg-sky-100"
      >
        <RiGroup2Line className=" w-full h-full xl:h-8 xl:w-8 mx-2 text-violet-500" />
      </div>
      {show && (
        <Drawer setShow={setShow}>
          <span className=" text-xl ">Communities</span>
          {communities}
        </Drawer>
      )}
    </>
  );
};

export default Communities;
