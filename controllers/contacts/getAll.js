const { Contact } = require("../../models/contact");

const getAll = async (req, res, next) => {
  try {
    const { id: owner } = req.user;
    const { page = 1, limit = 10, favorite } = req.query;
    const skip = (page - 1) * limit;

    if (favorite) {
      const favoriteContacts = await Contact.find({ owner, favorite }, "", {
        skip,
        limit,
      }).populate("owner", "email");

      res.json(favoriteContacts);
    } else {
      const contacts = await Contact.find({ owner }, "", {
        skip,
        limit,
      }).populate("owner", "email");

      res.json(contacts);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
