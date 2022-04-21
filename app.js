const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const bodyParser = require("body-parser");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const { Schema } = mongoose;
mongoose.connect("mongodb://localhost:27017/wikiDB");

const articleSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
});

const Article = mongoose.model("Article", articleSchema);

app.listen(process.env.PORT || 3000, () => {
  console.log("Listening on port 3000");
});
