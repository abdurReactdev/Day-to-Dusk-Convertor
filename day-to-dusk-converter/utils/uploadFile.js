import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { storage } from "../firebaseConfig";
import { v4 as uuid } from "uuid";

export const uploadImage = async (file) => {
  const imageRef = storageRef(storage, `images/${uuid()}`);

  const uploadRef = await uploadBytes(imageRef, file);

  // Get the download URL for the file
  const downloadURL = await getDownloadURL(uploadRef.ref);
  return downloadURL;
};
