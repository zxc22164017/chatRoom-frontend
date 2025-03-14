import Footer from "../PostPage/Footer";

import Thumbnail from "../Thumbnails/Thumbnail";

import useConvertToDate from "../../hooks/useConvertToDate";
import { useNavigate } from "react-router-dom";

const Post = ({ post }) => {
  const nav = useNavigate();
  const { community } = post;
  const time = useConvertToDate("time", post.postTime);

  return (
    <div
      className="w-full border-b-2 rounded py-2 px-5 hover:bg-sky-100 hover:cursor-pointer"
      onClick={() => {
        nav(`/post/${post._id}`);
      }}
    >
      <div className="flex mt-1 text-gray-500">
        <Thumbnail
          className={"w-6 h-6"}
          image={community.icon}
          alt={community.name}
        />
        <p className="text-sm mx-2 ">
          {community.name} • {time}
        </p>
      </div>
      <h2 className="text-2xl font-semibold">{post.title}</h2>
      <p className="truncate overflow-hidden text-nowrap mt-2 mb-1 text-gray-600">
        {post.content}
      </p>
      <div className="">
        {post.image && (
          <Thumbnail
            image={post.image}
            alt={post.title}
            className="bg-slate-600 w-full  mx-auto h-[390px] rounded-md"
          />
        )}
        <Footer likes={post.likes} comments={post.comments.length} />
      </div>
    </div>
  );
};

export default Post;
