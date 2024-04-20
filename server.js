import * as dotenv from "dotenv";
import express from "express";
import uploadRouter from "./controller/upload-file.controller";

dotenv.config();

const app = express();
app.set('view engine', 'ejs');

// Define a route handler for the /asd endpoint
app.get('/asd', (req, res) => {
    res.send('Hello world App.');
});

// Mount the uploadRouter middleware at the /upload endpoint
app.use('/upload', uploadRouter);

// Define the port number for the server to listen on
const port = process.env.PORT || 3000;

// Start the server and listen for incoming requests
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
