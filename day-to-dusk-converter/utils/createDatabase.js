import firebase_app from "../firebaseConfig";

export const createDocument = async (collectionName, data) => {
  try {
    const db = getFirestore(firebase_app);
    await db.collection(collectionName).add(data);
    console.log("Document created successfully.");
  } catch (error) {
    console.error("Error creating document:", error);
  }
};
