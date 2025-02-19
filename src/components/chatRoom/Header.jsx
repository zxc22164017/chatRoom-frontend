import Button from "../Button";
import { BsFillTelephoneFill, BsFillInfoCircleFill } from "react-icons/bs";
import Thumbnail from "../Thumbnails/Thumbnail";
import { useGetSingleRoomQuery } from "../../store";
import { useParams } from "react-router-dom";
import useGetLoginInfo from "../../hooks/useGetLoginInfo";
import Skeleton from "../Loading/Skeleton";
import { useNavigate } from "react-router-dom";

const Header = ({ setShow }) => {
  const nav = useNavigate();
  const { _id } = useParams();
  const currentUser = useGetLoginInfo();
  let content;
  let userToDisplay;
  const { data, isLoading } = useGetSingleRoomQuery(_id);

  if (isLoading) {
    content = <Skeleton times={1} className={"h-full"} />;
  } else if (data) {
    const users = data.users;
    userToDisplay = users.find((user) => {
      if (user._id !== currentUser._id) {
        return user;
      }
    });

    content = (
      <>
        <Thumbnail
          className={"h-12 w-12 ml-2"}
          image={data?.thumbnail ? data.thumbnail : userToDisplay.thumbnail}
        />
        <div className="px-2">
          <h1 className="group-hover:text-slate-50 text-lg">
            {data?.name ? data.name : userToDisplay.username}
          </h1>
          {/* {userToDisplay.isOnline ? (
            <p className="text-xs text-green-500 group-hover:text-slate-100">
              Online
            </p>
          ) : (
            <p className="text-xs text-gray-500 group-hover:text-slate-100">
              Offline
            </p>
          )} */}
        </div>
      </>
    );
  }

  const handleNav = () => {
    if (!data.name) {
      nav(`/profile/${userToDisplay._id}`);
    } else {
      setShow(true);
    }
  };

  return (
    <div className="shadow flex items-center justify-between px-2 py-2  h-16 ">
      <div
        className=" group hover:bg-slate-400 hover:cursor-pointer h-full rounded flex items-center "
        onClick={handleNav}
      >
        {content}
      </div>
      <div className="flex">
        <Button className={"rounded-full border-none h-10 hover:bg-slate-200"}>
          <BsFillTelephoneFill />
        </Button>
        <Button
          className={"rounded-full border-none h-10 hover:bg-slate-200"}
          onClick={() => {
            setShow(true);
          }}
        >
          <BsFillInfoCircleFill />
        </Button>
      </div>
    </div>
  );
};

export default Header;
