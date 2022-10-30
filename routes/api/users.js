const express = require("express");

const ctrl = require("../../controllers/users");

const { authenticate, isValidId } = require("../../middlewares");

const router = express.Router();

router.post("/signup", ctrl.signup);

router.post("/login", ctrl.login);

router.get("/logout", authenticate, ctrl.logout);

router.get("/current", authenticate, ctrl.getCurrent);

router.patch(
  "/:id/subscription",
  authenticate,
  isValidId,
  ctrl.updateSubscription
);

module.exports = router;
