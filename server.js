import * as dotenv from "dotenv";
import express from "express";
import uploadRouter from "./controller/upload-file.controller";
dotenv.config();

require('dotenv').config();

const app = express();
app.set('view engine', 'ejs');

app.get('/asd', (req, res) => {
    res.send('Hello world App. ')
})

app.use('/upload', uploadRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});