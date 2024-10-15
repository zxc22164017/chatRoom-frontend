import React from "react";
import Modal from "../components/Modal";
import Button from "../components/Button";
import LoadingFancy from "../components/Loading/LoadingFancy";

const DoubleConfirmModal = ({ onChange, isLoading, handleDelete, ...rest }) => {
  let content;
  if (isLoading) {
    content = (
      <div className="flex flex-col flex-grow items-center justify-center">
        <LoadingFancy />
      </div>
    );
  } else {
    content = (
      <>
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
      </>
    );
  }

  return (
    <Modal
      className={`inset-y-60 sm:inset-x-40 md:inset-x-60 ${rest.className}`}
      onChange={onChange}
    >
      {content}
    </Modal>
  );
};

export default DoubleConfirmModal;
