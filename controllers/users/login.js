const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const { User, schemas } = require("../../models/user");

const { requestError } = require("../../helpers");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const { error } = schemas.loginSchema.validate({ email, password });
    if (error) {
      throw requestError(400, error.message);
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw requestError(401, "Email or password is wrong");
    }

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      throw requestError(401, "Email or password is wrong");
    }

    const payload = {
      id: user.id,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
    await User.findByIdAndUpdate(user.id, { token });

    res.json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
