const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const convertToWebp = require("../middleware/sharp");

const bookCtrl = require("../controller/book");

router.get("/bestrating", bookCtrl.getTopBook);
router.get("/", bookCtrl.getAllBook);
router.get("/:id", bookCtrl.getOneBook);
router.post("/", auth, multer, convertToWebp, bookCtrl.createBook);
router.put("/:id", auth, multer, convertToWebp, bookCtrl.modifyBook);
router.delete("/:id", auth, bookCtrl.deleteBook);
router.post("/:id/rating", auth, bookCtrl.rateBook);

module.exports = router;
