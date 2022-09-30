const express = require("express");
const mongoose = require("mongoose");
const { readdirSync } = require("fs");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");

dotenv.config();
//middleware
app.use(cors());
app.use(express.json());

//routes
readdirSync("./routes").map((f) => app.use("/", require("./routes/" + f)));

//database
mongoose.connect(process.env.MONGODB_CONNECTION_URL).then(() => {
  console.log("database connected");
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
