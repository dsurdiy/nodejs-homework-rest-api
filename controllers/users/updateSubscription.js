const { User, schemas } = require("../../models/user");

const { requestError } = require("../../helpers");

const updateSubscription = async (req, res, next) => {
  try {
    const { error } = schemas.updateSubscriptionSchema.validate(req.body);
    if (error) {
      throw requestError(400, "Missing field subscription");
    }

    const { id } = req.params;
    const result = await User.findByIdAndUpdate(id, req.body, { new: true });

    if (!result) {
      throw requestError(404, "Not found");
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = updateSubscription;
