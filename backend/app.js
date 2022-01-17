const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
const db = require("./config/database");

dotenv.config();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use("/", require("./routes"));

app.get("/", (req, res) => {
  res.send("Hello User, Welcome to Iraitech!");
});

app.listen(port, () => {
  console.log(`Sever started at port ${port}!`);
});
