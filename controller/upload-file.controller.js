// import express from "express";
// import { initializeApp } from "firebase/app";
// import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
// import multer from "multer";
// import config from "../firebase.config";

// const router = express.Router()

// initializeApp(config.firebaseConfig);


// // Initialize Cloud Storage and get a reference to the service
// const storage = getStorage();

// // Setting up multer as a middleware to grab photo uploads
// const upload = multer({ storage: multer.memoryStorage() });


// router.post("/", upload.single("image"), async (req, res) => {
//     try {
//         const dateTime = giveCurrentDateTime();

//         const storageRef = ref(storage, `imageposts/${dateTime}_${req.file.originalname}`);

//         // Create file metadata including the content type
//         const metadata = {
//             contentType: req.file.mimetype,

//         };

//         // Upload the file in the bucket storage
//         const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);

//         const downloadURL = await getDownloadURL(snapshot.ref);

//         console.log("file uploaded successfully");

//         return res.send({
//             message: 'file uploaded successfully',
//             name: req.file.originalname,
//             type: req.file.mimetype,
//             downloadURL: downloadURL
//         })

//     } catch (error) {
//         return res.status(400).send(error.message);
//     }

// });

// const giveCurrentDateTime = () => {
//     const today = new Date();
//     const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
//     const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
//     const dateTime = date + ' ' + time;
//     return dateTime;

// }

// export default router;