const express = require("express");

const app = express();

app.use(express.json());

const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://henrymickael1:Openclassroom1@book.hyxrogq.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.post("/api/book", (req, res, next) => {
  console.log(req.body);
  res.status(201).json({
    message: "Book add",
  });
});

app.get("/api/book", (req, res, next) => {
  const book = [
    {
      userId: "identifiant",
      title: "String - titre du livre",
      author: "String - auteur du livre",
      imageUrl:
        "https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg",
      year: 2024,
      genre: "String - genre du livre",
      ratings: [
        {
          userId:
            "String - identifiant MongoDB unique de l'utilisateur qui a noté le livre",
          grade: 5,
        },
      ],
      averageRating: 3,
    },
  ];
  res.status(200).json(book);
});

module.exports = app;
