const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");


const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));


mongoose.connect("mongodb://localhost:27017/wikiDB" , {useNewUrlParser: true, useUnifiedTopology: true });

const articleSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String
  },

  content: {
    required: true,
    type: String
  }
})


const Article = new mongoose.model("Article", articleSchema);


app.route("/articles/:articleId")
  .get((_, res) => {
    Article.find((err, articles) => {
      if(!err) {
        res.send(articles);
      } else {
        res.send(err);
      }
    })
  })

  .put((req, res) => {
    Article.update(
      {id: req.params.articleId},
      {title: req.body.title, content: req.body.content},
      (err) => {
        if(!err){
          res.send("Successfully updated the content of the selected article.");
        } else {
          res.send(err);
        }
      }
    )  
  })

  .patch((req, res) => { 
    Article.update(
      {id: req.params.articleId},
      {$set: req.body},
      (err) => {
        if(!err) {
          res.send("Successfully updated article.")
        } else {
          res.send(err);
        }
      }
    )
  })




app.listen(5000, function() {
  console.log("Server started on port 5000");
});