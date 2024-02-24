import React, { useEffect, useState } from "react";
import ImageGallery from "../components/ImageGallery";
import Navbar from "../components/Navbar";
import { collection, getDoc, doc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useRouter } from "next/router";

const ImageHistory = () => {
  const [images, setImages] = useState([]);
  const router = useRouter();
  const docRef = doc(db, "OutputImages", "uPk1RF2dITYzlzN4b1TvrFZQf8z1");
  useEffect(() => {
    if (!localStorage.getItem("auth_token")) {
      router.replace("/login");
    }
    getDoc(docRef).then((res) => {
      console.log(res.data());
      setImages(res.data().images);
    });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="bg-white container mx-auto">
        <h1 className="text-3xl font-bold mb-4">Image Gallery</h1>
        {images.length == 0 ? (
          <h2 className="text-center">No Images Found !</h2>
        ) : (
          <ImageGallery images={images} />
        )}
      </div>
    </div>
  );
};

export default ImageHistory;
