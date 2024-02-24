// pages/api/convertImage.js
import Replicate from "replicate";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

export default async function handler(req, res) {
  try {
    const { imageUrl, userId } = req.body;

    console.log("image", imageUrl);

    const replicate = new Replicate({
      auth: "r8_ZcnMPz2qBnXvKTU80IJDHICfrA6THZW2RSHi1",
    });

    const output = await replicate.run(
      "lucataco/sdxl-controlnet:06d6fae3b75ab68a28cd2900afa6033166910dd09fd9751047043a5bbb4c184b",
      {
        input: {
          seed: 18457,
          image: imageUrl,
          prompt:
            "a family home at dusk with a beautiful sky at sunrise and warm lights inside the house, outdoor lights, beautiful, cozy, 4k",
          condition_scale: 0.8,
          negative_prompt: "low quality, bad quality, sketches, dark, black",
          num_inference_steps: 50,
        },
      }
    );

    const washingtonRef = doc(db, "OutputImages", userId);

    // Set the "capital" field of the city 'DC'
    await updateDoc(washingtonRef, {
      images: arrayUnion(`${output}`),
    });

    res.status(200).json({
      success: true,
      message: "Image converted successfully",
      imagePath: output,
    });
  } catch (error) {
    console.error("Error converting image:", error);
    res.status(500).json({ success: false, error: error });
  }
}
