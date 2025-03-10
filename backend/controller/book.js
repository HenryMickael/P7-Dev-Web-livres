const Book = require("../models/book");
const fs = require("fs");

exports.createBook = (req, res, next) => {
  const bookObjet = JSON.parse(req.body.book);
  delete bookObjet._userId;
  const book = new Book({
    ...bookObjet,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  book
    .save()
    .then(() => {
      res.status(201).json({ message: " Livre enregistré ! " });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};
exports.modifyBook = async (req, res, next) => {
  try {
    const book = req.file
      ? {
          ...JSON.parse(req.body.book),
          imageUrl: `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
          }`,
        }
      : { ...req.body };

    const oldBook = await Book.findOne({ _id: req.params.id });

    if (oldBook && oldBook.imageUrl && req.file) {
      const filename = oldBook.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, (err) => {
        if (err) {
          console.error("Error while deleting old image:", err);
        }
      });
    }

    await Book.updateOne(
      { _id: req.params.id },
      { ...book, _id: req.params.id }
    );

    res.status(200).json({ message: "Livre mis à jour !" });
  } catch (error) {
    res.status(400).json({ error });
  }
};
exports.deleteBook = (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then((book) => {
      if (book.imageUrl) {
        const filename = book.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Book.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: "Livre supprimé !" }))
            .catch((error) => res.status(400).json({ error }));
        });
      } else {
        Book.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Livre supprimé !" }))
          .catch((error) => res.status(400).json({ error }));
      }
    })
    .catch((error) => res.status(500).json({ error }));
};
exports.getAllBook = (req, res, next) => {
  Book.find()
    .then((books) => res.status(200).json(books))
    .catch((error) => res.status(400).json({ error }));
};
exports.getOneBook = (req, res, next) => {
  Book.findById(req.params.id)
    .then((book) => {
      if (!book) {
        return res.status(404).json({ error: "Book not found" });
      }
      res.status(200).json(book);
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.rateBook = (req, res, next) => {
  const userId = req.body.userId;
  const rating = parseInt(req.body.rating);

  if (isNaN(rating) || rating < 0 || rating > 5) {
    return res
      .status(400)
      .json({ message: "La note doit être comprise entre 0 et 5." });
  }

  Book.findOne({ _id: req.params.id })
    .then((book) => {
      if (!book) {
        return res.status(404).json({ message: "Livre non trouvé." });
      }

      const existingRating = book.ratings.find(
        (rating) => rating.userId === userId
      );

      if (existingRating) {
        return res
          .status(400)
          .json({ message: "L'utilisateur a déjà noté ce livre." });
      }

      book.ratings.push({ userId, grade: rating });

      const sumOfRates = book.ratings.reduce(
        (sum, rating) => sum + rating.grade,
        0
      );
      const averageRating = sumOfRates / book.ratings.length;
      book.averageRating = Math.round(averageRating);

      book
        .save()
        .then(() => res.status(200).json(book))
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
exports.getTopBook = (req, res, next) => {
  Book.find()
    .sort({ averageRating: -1 })
    .limit(3)
    .then((book) => {
      res.status(200).json(book);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
