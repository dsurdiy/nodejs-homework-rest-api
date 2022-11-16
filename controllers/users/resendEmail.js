const { User, schemas } = require("../../models/user");

const { requestError } = require("../../helpers");

const { createVerifyEmail, sendEmail } = require("../../services");

const resendEmail = async (req, res, next) => {
  try {
    const { email } = req.body;

    const { error } = schemas.verifyEmailSchema.validate({ email });
    if (error) {
      throw requestError(400, "Missing required field email");
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw requestError(404, "Not found");
    }

    if (user.verify) {
      throw requestError(400, "Verification has already been passed");
    }

    const mail = createVerifyEmail(email, user.verificationToken);

    await sendEmail(mail);

    res.json({
      message: "Verification email sent",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = resendEmail;
