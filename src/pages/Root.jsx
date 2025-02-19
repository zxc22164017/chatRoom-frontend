import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDetectLogin } from "../hooks/useDetectLogin";
import NavBar from "../components/NavBar/NavBar";
import BackToTop from "../components/BackToTop";
import { useEffect, useRef, useState } from "react";
import { useGetUserQuery } from "../store";
import { skipToken } from "@reduxjs/toolkit/query";

function Root() {
  let content;
  const nav = useNavigate();
  const jwt = useDetectLogin();
  const { isError, isSuccess } = useGetUserQuery(jwt || skipToken);
  const [show, setShow] = useState(false);
  const div = useRef();

  useEffect(() => {
    if (!jwt || isError) {
      nav("/");
    }
  }, [jwt, isError]);
  const showScrollToBack = () => {
    if (window.scrollY > 500) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", showScrollToBack);
    return () => {
      window.removeEventListener("scroll", showScrollToBack);
    };
  }, []);

  if (jwt && isSuccess) {
    content = (
      <div ref={div} className=" flex flex-col min-h-screen bg-topic-100">
        <NavBar />
        <Outlet />
        {show && <BackToTop />}
      </div>
    );
  } else {
    content = (
      <div className="relative max-h-svh bg-topic-100 overflow-hidden">
        <Outlet />
      </div>
    );
  }

  return content;
}

export default Root;
