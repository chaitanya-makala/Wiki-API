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

app
  .route("/articles")
  .get((req, res) => {
    Article.find({}, (err, result) => {
      if (!err) {
        res.send(result);
      } else {
        res.send(err);
      }
    });
  })
  .post((req, res) => {
    const article = new Article({
      title: req.body.title,
      content: req.body.content,
    });
    article.save((err) => {
      if (!err) {
        res.send("Successfully added a new article.");
      } else {
        res.send(err);
      }
    });
  })
  .delete((req, res) => {
    Article.deleteMany({}, (err) => {
      if (!err) {
        res.send("Deleted all articles.");
      } else {
        res.send(err);
      }
    });
  });

app.listen(process.env.PORT || 3000, () => {
  console.log("Listening on port 3000");
});
