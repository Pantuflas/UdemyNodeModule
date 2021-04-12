require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const port = 5000;
const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.use(session({
  secret: "newlongstringmuffinforsomereason",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true,useUnifiedTopology: true});
mongoose.set("useCreateIndex", true);

const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", (_, res) => {
  res.render("home");
});

app.get("/login", (_, res) => {
  res.render("login");
});

app.get("/register", (_, res) => {
  res.render("register");
});

app.get("/posts", (req, res) => {
  if(req.isAuthenticated()){
    res.render("/posts");
  }
  if(!req.isAuthenticated) {
    res.render("/login");
  }
});

app.post("/register", (req, res) => {
  User.register({username: req.body.username}, req.body.password, (err, registeredUser) => {
    if(err) {
      console.log(err);
      res.redirect("/register");
    }
    if(!err) {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/posts");
      });
    }
  });
});

app.post("/login", function(req, res){

  const user = new User({
    username: req.body.username,
    password: req.body.password
  });

  req.login(user, function(err){
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function(){
        res.redirect("/posts");
      });
    }
  });

});


/* 
*******Register using bcrypt*******
app.post("/register", (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    const newUser = new User({
      email: req.body.useremail,
      password: hash
    });
    newUser.save((err) => {
      if (!err) {
        res.render("posts");
      } else {
        console.log(err);
      }
    });
  });
});

*****Login using bcrypt*****
app.post("/login", (req, res) => {
  const useremail = req.body.useremail;
  const password = req.body.password;

  User.findOne({email: useremail}, (err, foundUser) => {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        bcrypt.compare(password, foundUser.password, (err, bcryptResult) => {
          if(bcryptResult){
            res.render("posts");
          }
        });
      }
    }
  });
});
 */













app.listen(port, () => {
  console.log("Server running on port " + port);
});