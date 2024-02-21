import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Dropzone from "react-dropzone";
import Navbar from "@/components/Navbar";
import axios from "axios";
import { uploadImage } from "../../utils/uploadFile";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  const [image, setImage] = useState();
  const [outputImage, setOutputImage] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("auth_token")) {
      router.replace("/login");
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-white">
        \
        <label
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          for="file_input"
        >
          Upload file
        </label>
        <input
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          type="file"
          onChange={async (e) => {
            await setImage(e.target.files[0]);
            console.log("Images", e.target.files[0]);
            const url = await uploadImage(image);

            // let imageUrl;
            const response = await axios.post("/api/hello", {
              imageUrl: url,
            });
            setOutputImage(response.data.imagePath);
          }}
        />
        <Dropzone
          onDrop={async (acceptedFiles) => {
            setImage(acceptedFiles[0]);
            console.log("Images", acceptedFiles);
            const url = await uploadImage(image);

            // let imageUrl;
            const response = await axios.post("/api/hello", {
              imageUrl: url,
            });
            setOutputImage(response.data.imagePath);
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
        {outputImage && <img src={outputImage} />}
      </div>
    </>
  );
}
