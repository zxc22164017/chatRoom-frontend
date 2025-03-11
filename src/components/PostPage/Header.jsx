import Button from "../Button";
import Thumbnail from "../Thumbnails/Thumbnail";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Header = ({ community }) => {
  const nav = useNavigate();
  return (
    <div
      className={`flex items-center  p-2 bg-topic-100 border-b-2 border-contrast-100`}
    >
      <Button
        onClick={() => {
          nav(-1);
        }}
        rounded
        className="h-8 p-1  w-8 hover:animate-changeColor  border-none"
      >
        <FaArrowLeft className="h-full w-full" />
      </Button>
      <div
        onClick={() => {
          nav(`/c/${community.name}`);
        }}
        className="flex items-center ml-2 hover:bg-violet-900 p-2 transition-colors duration-200 gap-2 hover:cursor-pointer hover:text-violet-50"
      >
        <Thumbnail
          className={"w-10 h-10"}
          image={community.icon}
          alt={community.name}
        />
        <h2>{community.name}</h2>
      </div>
    </div>
  );
};

export default Header;
