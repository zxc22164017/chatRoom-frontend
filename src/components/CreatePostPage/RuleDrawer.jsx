import React, { useState } from "react";
import Drawer from "../Drawer.jsx";
import ExpandablePanel from "../ExpandablePanel";
import Thumbnail from "../Thumbnails/Thumbnail";
import { useNavigate } from "react-router-dom";

const RuleDrawer = ({ setShow, community, managers }) => {
  const nav = useNavigate();
  let renderRules;
  let renderManagers;

  if (community?.rules) {
    const { rules } = community;
    renderRules = rules.map((rule) => {
      return (
        <li key={rule._id}>
          <ExpandablePanel outerClassName={"w-80"} header={rule.title}>
            {rule.content}
          </ExpandablePanel>
        </li>
      );
    });
  }

  if (managers) {
    renderManagers = managers.map((user) => {
      return (
        <div className="group flex flex-wrap  " key={user._id}>
          <div className="relative mx-1">
            <Thumbnail
              className={"h-10 w-10 hover:cursor-pointer"}
              image={user.thumbnail}
              onClick={() => {
                nav(`/profile/${user._id}`);
              }}
            />
            <p className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
              {user.username}
            </p>
          </div>
        </div>
      );
    });
  }

  return (
    <Drawer setShow={setShow} className="items-start">
      <h1 className="text-xl mb-4 font-semibold ">
        {community?.label || community?.name} rules
      </h1>
      {managers && <h2>Managers</h2>}
      <div className="flex">{renderManagers}</div>
      <ol className="list-decimal">{renderRules}</ol>
    </Drawer>
  );
};

export default RuleDrawer;
