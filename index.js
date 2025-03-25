const express = require('express');
const { resolve } = require('path');
const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = 3010;

app.use(express.static('static'));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

const router = require("./router");
app.use("/menu",router);

app.listen(port, async() => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Server connected successfully....");
    console.log(`Example app listening at http://localhost:${port}`);
  } catch (error) {
    console.log("Something went wrong whlie connectiong to server.....!",error)
  }
});
