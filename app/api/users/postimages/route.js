import { db } from "@/lib/db";
import * as dotenv from 'dotenv';
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import multer from "multer";
import { NextResponse } from "next/server";

dotenv.config();

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_APIKEY,
    authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECTID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
    appId: process.env.NEXT_PUBLIC_APPID
};

initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage();

// Setting up multer as a middleware to grab photo uploads
const upload = multer({ storage: multer.memoryStorage() });

export const config = {
    api: {
        bodyParser: false,
    },
};

const giveCurrentDateTime = () => {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + ' ' + time;
    return dateTime;
}

export async function POST(req, res) {
    try {
        await new Promise((resolve, reject) => {
            upload.single('image')(req, res, function (err) {
                if (err) {
                    console.log("Multer error: ", err); // Add logging here
                    reject(err);
                }
                resolve();
            });
        });
        if (!req.file) {
            console.log("Request: ", req); // Add logging here
            throw new Error("No file provided in the request");
        }

        const dateTime = giveCurrentDateTime();

        const storageRef = ref(storage, `imageposts/${req.file.originalname} ${dateTime}`);

        // Create file metadata including the content type
        const metadata = {
            contentType: req.file.mimetype,
        };

        // Upload the file in the bucket storage
        const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);

        const downloadURL = await getDownloadURL(snapshot.ref);

        console.log("file uploaded successfully");

        const newPost = await db.post.create({
            data: {
                image: downloadURL,
            }
        });

        return NextResponse.json({
            message: 'file uploaded to firebase storage',
            name: req.file.originalname,
            type: req.file.mimetype,
            downloadURL: downloadURL
        }, { status: 201 });

    } catch (error) {
        console.log("Error: ", error); // Add logging here
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};
