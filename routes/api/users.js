const express = require("express");

const ctrl = require("../../controllers/users");

const { authenticate, isValidId, upload } = require("../../middlewares");

const router = express.Router();

router.post("/signup", ctrl.signup);

router.get("/verify/:verificationToken", ctrl.verify);

router.post("/verify", ctrl.resendEmail);

router.post("/login", ctrl.login);

router.get("/logout", authenticate, ctrl.logout);

router.get("/current", authenticate, ctrl.getCurrent);

router.patch(
  "/:id/subscription",
  authenticate,
  isValidId,
  ctrl.updateSubscription
);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = router;
