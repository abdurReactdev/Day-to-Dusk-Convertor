import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Dropzone from "react-dropzone";
import Navbar from "@/components/Navbar";
import axios from "axios";
import { uploadImage } from "../../utils/uploadFile";
import Modal from "@/components/Modal";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  const [loading, setLodaing] = useState(false);
  const [outputImage, setOutputImage] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("auth_token")) {
      router.replace("/login");
    }
  }, []);

  const closeModal = () => {
    setOutputImage("");
  };

  return (
    <>
      <Navbar />
      <div className="bg-white container mx-auto">
        <div class="mb-4 md:mb-10 mt-8 md:mt-20">
          <div class="leading-9 font-semibold text-center text-[#19191B] text-left text-3xl md:text-5xl mb-4">
            Day to Dusk
            <span class="font-bold z-10 text-blue-500 ml-2 relative">
              <span class="z-10">with one&nbsp;click</span>
            </span>
          </div>
          <div class="text-[#19191B] text-xl text-center">
            Upload a picture and our AI will tranform it from day to dusk.
          </div>
        </div>
        <label
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          for="file_input"
        >
          Upload file
        </label>
        <Dropzone
          onDrop={async (acceptedFiles) => {
            try {
              setLodaing(true);
              const imageTypes = [
                "image/jpeg",
                "image/png",
                "image/gif",
                "image/bmp",
              ];
              if (imageTypes.includes(acceptedFiles[0].type)) {
                console.log("Images", acceptedFiles[0]);
                const url = await uploadImage(acceptedFiles[0]);

                // let imageUrl;
                const response = await axios.post("/api/hello", {
                  imageUrl: url,
                  userId: JSON.parse(localStorage.getItem("userDetails")).uid,
                });
                setLodaing(false);
                setOutputImage(response.data.imagePath);
              } else {
                alert("Please only enter file type of image.");
              }
            } catch {
              alert("Something went wrong!\nPlease try again.");
              setLodaing(false);
              setOutputImage("");
            }
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <section {...getRootProps()}>
              <label
                for="dropzone-file"
                class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    class="w-10 h-10 mb-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span class="font-semibold">Click to upload</span> or drag
                    and drop
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input {...getInputProps()} />
              </label>
            </section>
          )}
        </Dropzone>
        {loading && (
          <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50">
            <div class="flex justify-center items-center h-screen opacity-1">
              <div class="leading-9 font-semibold text-blue-500 text-left text-3xl md:text-5xl mb-4">
                Please wait while your image is being tranformed ...
              </div>
            </div>
          </div>
        )}
        <Modal
          isOpen={outputImage ? true : false}
          onClose={closeModal}
          imageUrl={outputImage}
        />
        {outputImage && (
          <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40"></div>
        )}
      </div>
    </>
  );
}
