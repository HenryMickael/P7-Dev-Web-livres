const express = require("express");
const router = express.Router();
const auth = require("auth");

const bookCtrl = require("../controller/book");

router.get("/", auth, bookCtrl.getAllStuff);
router.post("/", auth, bookCtrl.createThing);
router.get("/:id", auth, bookCtrl.getOneThing);
router.put("/:id", auth, bookCtrl.modifyThing);
router.delete("/:id", auth, bookCtrl.deleteThing);

module.exports = router;
