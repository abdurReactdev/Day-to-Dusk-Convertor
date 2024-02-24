import axios from "axios";
import React from "react";

export default function Modal({ isOpen, onClose, imageUrl }) {
  if (!isOpen) return null;

  const downloadImage = async () => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "duskImage.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      <div className="relative w-auto max-w-3xl mx-auto my-6 bg-gray-200 shadow-lg p-6 rounded-md">
        {/*content*/}
        <img src={imageUrl} alt="Image" className="w-[80%] h-[80%] mx-auto" />
        <button
          className="absolute top-0 right-0 mt-4 mr-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <svg
            className="h-6 w-6 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.293 10l3.646-3.646a1 1 0 10-1.414-1.414L10.88 8.293l-3.647-3.647a1 1 0 10-1.414 1.414L9.465 10l-3.646 3.646a1 1 0 101.414 1.414L10.88 11.707l3.647 3.647a1 1 0 001.414-1.414L12.293 10z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div className="flex justify-center mt-3">
          <button
            className=" transition-all flex text-base font-semibold  rounded-lg   px-6 py-2  md:mr-4 text-white bg-blue-500 border-blue-500 hover:bg-blue-600 h-full border border-solid"
            onClick={downloadImage}
          >
            Download Image
          </button>
        </div>
      </div>
    </div>
  );
}
