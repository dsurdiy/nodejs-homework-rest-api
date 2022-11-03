const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const { User, schemas } = require("../../models/user");

const { requestError } = require("../../helpers");

const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const { error } = schemas.registerSchema.validate({ email, password });
    if (error) {
      throw requestError(400, error.message);
    }

    const user = await User.findOne({ email });
    if (user) {
      throw requestError(409, "Email in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);

    const newUser = await User.create({
      email,
      password: hashPassword,
      avatarURL,
    });

    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signup;
