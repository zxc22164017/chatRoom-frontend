import React from "react";
import UserResult from "../Search/UserResult";
import { useSearchUsersMutation } from "../../store";
import Skeleton from "../Loading/Skeleton";
import Alert from "../Alert";
export function MainContent({}) {
  const [searchUsers, results] = useSearchUsersMutation({
    fixedCacheKey: "search",
  });
  let content;

  if (results.isLoading) {
    content = <Skeleton times={5} className={"w-full h-20"} />;
  }
  if (results.isSuccess) {
    content = results.data.map((user) => {
      return <UserResult user={user} key={user._id} />;
    });
  }
  if (results.isError) {
    content = (
      <div>
        <Alert error={"Internal server error"} />
      </div>
    );
  }
  return (
    <div className="bg-white mx-0 md:mx-96 min-w-sm flex flex-grow flex-col mt-14">
      {content}
    </div>
  );
}
