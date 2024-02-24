import React, { useState } from "react";
import Modal from "./Modal";

const Image = ({ imageUrl }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <img
        src={imageUrl}
        className="rounded-l hover:cursor-pointer"
        onClick={() => {
          setIsOpen(true);
        }}
      />
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        imageUrl={imageUrl}
      />
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40"></div>
      )}
    </>
  );
};

export default Image;
