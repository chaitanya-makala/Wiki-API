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

// Request Targetting All Articles

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

// Requests Targetting A Specific Article

app
  .route("/articles/:articleTitle")
  .get((req, res) => {
    Article.findOne({ title: req.params.articleTitle }, (err, result) => {
      if (result) {
        res.send(result);
      } else {
        res.send("No Articles Matching The Title Found");
      }
      if (err) {
        res.send(err);
      }
    });
  })
  .put((req, res) => {
    Article.findOneAndUpdate(
      { title: req.params.articleTitle },
      { title: req.body.title, content: req.body.content },
      { overwrite: true },
      (err) => {
        if (err) {
          res.send(err);
        } else {
          res.send("Successfully updated article");
        }
      }
    );
  })
  .patch((req, res) => {
    Article.findOneAndUpdate(
      { title: req.params.articleTitle },
      { $set: req.body },
      (err) => {
        if (!err) {
          res.send("successfully patched the data");
        } else {
          res.send(err);
        }
      }
    );
  })
  .delete((req, res) => {
    Article.findOneAndDelete({ title: req.params.articleTitle }, (err) => {
      if (!err) {
        res.send("Successfully deleted the article");
      } else {
        res.send(err);
      }
    });
  });

app.listen(process.env.PORT || 3000, () => {
  console.log("Listening on port 3000");
});
