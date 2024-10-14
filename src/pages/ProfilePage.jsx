import PersonalInfo from "../components/profile/PersonalInfo";
import React from "react";

import { useParams } from "react-router-dom";

import PersonalPostList from "../components/profile/PersonalPostList";

const ProfilePage = () => {
  const { _id } = useParams();

  return (
    <div className="mt-14 flex flex-col xl:mx-80 flex-grow">
      <PersonalInfo id={_id} />
      <PersonalPostList userId={_id} />
    </div>
  );
};

export default ProfilePage;
