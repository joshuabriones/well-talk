import firebaseConfig from "@/firebaseConfig";
import { db } from "@/lib/db";
import * as dotenv from 'dotenv';
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import multer from "multer";
import { NextResponse } from 'next/server';

dotenv.config();

initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage();

export const config = {
    api: {
        bodyParser: false,
    },
};

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // keep images size below 5MB
    },
});

export async function POST(req, res) {
    return new Promise(async (resolve, reject) => {
        try {
            await new Promise((resolve, reject) => {
                upload.single('file')(req, {}, function (err) {
                    if (err) {
                        console.log("Multer error: ", err);
                        reject(err);
                    }
                    resolve();
                });
            });

            if (!req.file) {
                console.log("Request: ", req); // Add logging here
                resolve(NextResponse.json({ error: "No file provided in the request" }, { status: 400 }));
            }

            const storageRef = ref(storage, `imageposts/${req.file.originalname}`);

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

            resolve(NextResponse.json({
                message: 'file uploaded to firebase storage',
                name: req.file.originalname,
                type: req.file.mimetype,
                downloadURL: downloadURL
            }, { status: 201 }));

        } catch (error) {
            console.log("Error: ", error); // Add logging here
            resolve(NextResponse.json({ error: error.message }, { status: 500 }));
        }
    });
};
