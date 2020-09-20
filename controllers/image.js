const { json } = require("body-parser");
const { request, response } = require("express");

const Clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: "ce602c28ddff4cd1a2a8f7856c0a8420",
});

const handleApiCall = (request, response) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, request.body.input)
    .then((data) => {
      response.json(data);
    })
    .catch((err) => response.status(400).json("unable to work with API"));
};

const handleImage = (request, response, db) => {
  const { id } = request.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      response.json(entries[0]);
    })
    .catch((err) => response.status(400).json("unable to get entries"));
};

module.exports = {
  handleImage: handleImage,
  handleApiCall: handleApiCall,
};
