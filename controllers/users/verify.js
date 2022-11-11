const { User } = require("../../models/user");

const { requestError } = require("../../helpers");

const verify = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });

    if (!user) {
      throw requestError(404, "User not found");
    }

    await User.findByIdAndUpdate(user.id, {
      verify: true,
      verificationToken: "",
    });

    res.json({
      message: "Verification successful",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = verify;
