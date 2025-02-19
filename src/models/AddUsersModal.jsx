import { SearchUsers } from "../components/Search/SearchUsers";

import { useState } from "react";
import Modal from "../components/Modal";
import Button from "../components/Button";
import { useGetSingleRoomQuery, usePatchRoomMutation } from "../store";

import { useParams } from "react-router-dom";

const AddUsersModal = ({ onChange }) => {
  const { _id } = useParams();

  const [patchRoom] = usePatchRoomMutation();
  const { data } = useGetSingleRoomQuery(_id);
  const [selectUser, setSelectUser] = useState([]);

  const handlSubmit = (e) => {
    e.preventDefault();
    const existUsers = data.users;
    const uploadUsers = [...selectUser, ...existUsers];

    patchRoom({ users: uploadUsers, roomId: _id });
    onChange();
  };

  return (
    <Modal onChange={onChange}>
      <form
        onSubmit={handlSubmit}
        className="flex flex-col w-full items-center"
      >
        <h1 className="font-bold ">Add Users</h1>
        <div className="border-t-2 mt-2 w-full flex items-center border-collapse">
          <h1 className="py-3">Name: {data?.name}</h1>
        </div>
        <SearchUsers
          selectUser={selectUser}
          setSelectUser={setSelectUser}
          existUsers={data?.users}
        />
        <Button primary rounded>
          Add
        </Button>
      </form>
    </Modal>
  );
};

export default AddUsersModal;
