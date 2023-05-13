const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  book: [
    {
      userId: { type: String, required: true },
      title: { type: String, required: true },
      author: { type: String, required: true },
      imageUrl: {
        type: String,
        default:
          "https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg",
      },
      year: { type: Number, required: true },
      genre: { type: String, required: true },
      ratings: [
        {
          userId: { type: String, required: true },
          grade: { type: Number, required: true },
        },
      ],
      averageRating: { type: Number, default: 0 },
    },
  ],
});

module.exports = mongoose.model("Book", bookSchema);
