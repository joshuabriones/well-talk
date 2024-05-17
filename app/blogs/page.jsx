// StoreImageFirebase.js
"use client";
import { imgDB } from "@/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { v4 } from "uuid";

export default function StoreImageFirebase() {
  const [img, setImg] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelection = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleClick = async () => {
    if (selectedFile) {
      const imgs = ref(imgDB, `Postimages/${v4()}`);
      const snapshot = await uploadBytes(imgs, selectedFile);
      const url = await getDownloadURL(snapshot.ref);
      setImg(url);

      // Send a POST request with the image URL
      const response = await fetch("/api/users/counselor/createpost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // ...other fields,
          image: url,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
    }
  };

  return (
    <div>
      <input type="file" onChange={(e) => handleFileSelection(e)} />
      <br />
      <br />
      <button onClick={handleClick}>Upload</button>
      {img && <img src={img} height="200px" width="200px" />}
    </div>
  );
}
