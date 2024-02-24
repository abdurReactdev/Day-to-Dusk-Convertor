// pages/api/convertImage.js

export default async function handler(req, res) {
  try {
    const { imageUrl } = req.body;

    const picRes = await fetch(imageUrl);

    console.log("content-type:", picRes.headers.get("content-type"));

    // maybe you can use this too see if the image's too large
    // to send downstream
    console.log("content-length:", picRes.headers.get("content-length"));
    const imageBlob = await picRes.blob();

    const chunks = [];

    for (const chunk of imageBlob.stream().read()) {
      chunks.push(chunk);
    }

    console.log(chunks.length);
    res.setHeader(
      "content-type",
      picRes.headers.get("content-type") || "image/*"
    );

    res.setHeader(
      "content-length",
      picRes.headers.get("content-length") || chunks.length
    );

    res.setHeader("Content-Disposition", 'attachment; filename="tomato.jpeg"');

    res.write(Uint8Array.from(chunks));

    return res.status(200).end();
  } catch (error) {
    console.error("Error converting image:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}
