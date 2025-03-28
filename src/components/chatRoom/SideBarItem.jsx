import UserTemplate from "../UserTemplate";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Thumbnail from "../Thumbnails/Thumbnail";

const SideBarItem = ({ object, currentUser }) => {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [info, setInfo] = useState("");
  const [img, setImg] = useState("");

  useEffect(() => {
    if (!currentUser) return;

    const filteredUsers = object.users.filter((user) => {
      if (user._id !== currentUser._id) {
        return user;
      }
    });
    if (object?.name) {
      setName(object.name);
    } else {
      setName(filteredUsers[0].username);
    }
    if (object?.lastMessage) {
      setInfo(object.lastMessage.message);
    }
    if (object?.thumbnail) {
      setImg(object.thumbnail);
    } else {
      setImg(filteredUsers[0].thumbnail);
    }
  }, [object, currentUser]);
  const handleClick = () => {
    nav(`/chat/${object._id}`);
  };
  return (
    <>
      <UserTemplate
        className={"hidden lg:flex p-2"}
        onClick={handleClick}
        name={name}
        info={info}
        image={img}
      ></UserTemplate>
      <Thumbnail
        image={img}
        className={"h-10 w-10 m-2 block lg:hidden hover:cursor-pointer"}
        onClick={handleClick}
        alt={name}
      />
    </>
  );
};

export default SideBarItem;
