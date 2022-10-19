const { isValidObjectId } = require("mongoose");

const { requestError } = require("../helpers");

const isValidId = (req, res, next) => {
  const { id } = req.params;
  const result = isValidObjectId(id);

  if (!result) {
    next(requestError(400, "Invalid id format"));
  }

  next();
};

module.exports = isValidId;
