import React, { useState } from "react";
import Image from "./Image";

const ImageGallery = ({ images }) => {
  return (
    <div className="grid grid-cols-3 gap-1">
      {images?.map((image, index) => (
        <Image imageUrl={image} key={index} />
      ))}
    </div>
  );
};

export default ImageGallery;
