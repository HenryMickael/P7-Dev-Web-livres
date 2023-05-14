const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const bookCtrl = require("../controller/book");

router.get("/", bookCtrl.getAllStuff);
router.post("/", auth, multer, bookCtrl.createThing);
router.get("/:id", bookCtrl.getOneThing);
router.put("/:id", auth, bookCtrl.modifyThing);
router.delete("/:id", auth, bookCtrl.deleteThing);

module.exports = router;
