const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contacts");

const { authenticate, isValidId } = require("../../middlewares");

router.get("/", authenticate, ctrl.getAll);

router.get("/:id", authenticate, isValidId, ctrl.getById);

router.post("/", authenticate, ctrl.add);

router.delete("/:id", authenticate, isValidId, ctrl.removeById);

router.put("/:id", authenticate, isValidId, ctrl.updateById);

router.patch("/:id/favorite", authenticate, isValidId, ctrl.updateFavorite);

module.exports = router;
