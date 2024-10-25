import React, { useRef } from "react";
import Panel from "../Panel";
import { useNavigate } from "react-router-dom";
import ResultPanelItem from "./ResultPanelItem";
import { changeSearchInput } from "../../store";
import { useDispatch } from "react-redux";

import { useEffect } from "react";

const ResultPanel = ({ className, userData, postData, setShow }) => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const panelElement = useRef();
  let content;

  if (userData) {
    content = userData.map((item) => {
      return (
        <ResultPanelItem
          onClick={() => {
            dispatch(changeSearchInput(""));
            nav(`/profile/${item._id}`);
          }}
          key={item._id}
          data={item}
          type="user"
        />
      );
    });
  }
  if (postData) {
    content = postData.map((item) => {
      return (
        <ResultPanelItem
          onClick={() => {
            dispatch(changeSearchInput(""));
            nav(`/post/${item._id}`);
          }}
          key={item._id}
          data={item}
          type="post"
        />
      );
    });
  }

  useEffect(() => {
    const handler = (e) => {
      if (!panelElement.current) {
        return;
      }
      if (!panelElement.current.contains(e.target)) {
        setShow(false);
      }
    };
    document.addEventListener("click", handler, true);
    return () => {
      document.removeEventListener("click", handler, true);
    };
  }, []);

  return (
    <div ref={panelElement}>
      <Panel className={`w-full mt-1 bg-white ${className}`}>{content}</Panel>
    </div>
  );
};

export default ResultPanel;
