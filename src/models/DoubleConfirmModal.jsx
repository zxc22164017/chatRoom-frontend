import React from "react";
import Modal from "../components/Modal";
import Button from "../components/Button";

const DoubleConfirmModal = ({ onChange, handleDelete, ...rest }) => {
  return (
    <Modal
      className={`inset-y-60 sm:inset-x-40 md:inset-x-60 ${rest.className}`}
      onChange={onChange}
    >
      <h1 className="text-3xl font-extrabold text-red-500">Are You Sure?</h1>
      <p>
        This action is not{" "}
        <span className="font-bold text-red-500">reversible</span>
      </p>
      <div className="flex w-full justify-evenly gap-4">
        <Button onClick={onChange} success>
          No
        </Button>
        <Button onClick={handleDelete} danger>
          Yes
        </Button>
      </div>
    </Modal>
  );
};

export default DoubleConfirmModal;
