const signup = require("./signup");
const verify = require("./verify");
const resendEmail = require("./resendEmail");
const login = require("./login");
const logout = require("./logout");
const getCurrent = require("./getCurrent");
const updateSubscription = require("./updateSubscription");
const updateAvatar = require("./updateAvatar");

module.exports = {
  signup,
  verify,
  resendEmail,
  login,
  logout,
  getCurrent,
  updateSubscription,
  updateAvatar,
};
