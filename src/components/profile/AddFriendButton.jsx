import React from "react";
import Button from "../Button";
import Alert from "../Alert";
import { useEffect, useState } from "react";
import { useAddFriendMutation } from "../../store";
import LoadingDot from "../Loading/LoadingDot";
const AddFriendButton = ({ currentUser, id }) => {
  const [addFriend, addResult] = useAddFriendMutation();
  const [isFriend, setIsFriend] = useState(false);

  const [error, setError] = useState("");
  const handleAddFriend = () => {
    addFriend({ user01Id: currentUser._id, user02Id: id });
    setIsFriend(true);
    if (addResult.isError) {
      setError(addResult.data);
    }
  };
  useEffect(() => {
    if (currentUser) {
      if (currentUser.friends?.includes(id)) {
        setIsFriend(true);
      } else {
        setIsFriend(false);
      }
    }
  }, [currentUser, id]);

  const handleRemoveFriend = () => {
    addFriend({ user01Id: currentUser._id, user02Id: id });
    setIsFriend(!isFriend);

    if (addResult.isError) {
      setError(addResult.data);
    }
  };

  let content;
  if (isFriend == false) {
    content = (
      <Button
        primary
        rounded
        className={" w-48 h-12 ml-0 mr-4 xl:-mt-24"}
        onClick={handleAddFriend}
      >
        Add Friend
      </Button>
    );
  } else if (addResult.isLoading) {
    content = (
      <Button rounded className={" w-48 h-12 ml-0 mr-4 xl:-mt-24"} disabled>
        loading
        <LoadingDot className={"ml-2 bg-gray-700 h-1 w-1"} />
      </Button>
    );
  } else if (isFriend) {
    content = (
      <Button
        onClick={handleRemoveFriend}
        primary
        rounded
        className={" w-48 h-12 ml-0 mr-4 xl:-mt-24"}
      >
        Remove Friend
      </Button>
    );
  } else if (error) {
    <div>
      <Button rounded className={" w-48 h-12 ml-0 mr-4 xl:-mt-24"} disabled>
        Add Friend
      </Button>
      <Alert error={error} />
    </div>;
  }

  return content;
};
export default AddFriendButton;
