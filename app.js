const express = require("express");
const app = express();

const mongoose = require("mongoose");
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
