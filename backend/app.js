const express = require("express");
const mongoose = require("mongoose");

const bookRoutes = require("./routes/book");
const userRoutes = require("./routes/user");

app.use(express.json());

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

const app = express();

app.use("/api/books", bookRoutes);
ape.use("/api/auth", userRoutes);
module.exports = app;
