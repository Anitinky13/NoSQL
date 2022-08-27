const mongoose = require("mongoose");
const express = require("express");
const { MongoNotConnectedError } = require("mongodb");

const app = express();
const PORT = process.env.PORT || 3003;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(require("./routes"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/NoSQL", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Use this to log mongo queries being execute
mongoose.set("debug", true);
app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
