const express = require('express');
const app = express();
const port = 5000;

app.get("/", function(req, res){
  res.send("<h1>WADUP</h1>");
});

app.get("/contact", function (req, res) {
  res.send("Contact me at: some@email.com");
});

app.get("/about", function (req, res) {
  res.send("A brief bio of something");
});

app.get("/hobbies", function (req, res) {
  res.send("Hobbies landing page");
});

app.listen(port, function() {
  console.log("Server listening on port: " + port)
});