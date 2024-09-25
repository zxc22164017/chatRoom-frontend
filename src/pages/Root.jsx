import { Outlet } from "react-router-dom";
import { useDetectLogin } from "../hooks/useDetectLogin";
import NavBar from "../components/NavBar/NavBar";
function Root() {
  let content;

  if (useDetectLogin()) {
    content = (
      <div className=" flex flex-col min-h-screen bg-topic-500">
        <NavBar />
        <Outlet />
      </div>
    );
  } else {
    content = (
      <div className="  min-h-screen bg-topic-500">
        <Outlet />
      </div>
    );
  }

  return content;
}

export default Root;
