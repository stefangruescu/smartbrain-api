const { response, request } = require("express");
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const register = require("./controllers/register");
const signIn = require("./controllers/signIn");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "bvczabk3q12",
    database: "smartbrain",
  },
});

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (request, response) => {
  response.send(db.users);
});

app.post("/signin", (request, response) => {
  signIn.handleSignIn(request, response, db, bcrypt);
});

app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

app.get("/profile/:id", (request, response) => {
  profile.handleProfile(request, response, db);
});

app.put("/image", (request, response) => {
  image.handleImage(request, response, db);
});
app.post("/imageurl", (request, response) => {
  image.handleApiCall(request, response);
});

app.listen(3000, () => {
  console.log("app is running on port 3000");
});

// --> response = this is working
//  /signin  --> POST = succes/fail
// /register --> POST = user
// /profile/:userId --> GET = user
// /image --> PUT --> user
