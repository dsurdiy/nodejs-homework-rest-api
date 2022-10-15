const contacts = require("../../models/contacts");

const { requestError } = require("../../helpers");

const removeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedContact = await contacts.removeContact(id);
    if (!deletedContact) {
      throw requestError(404, "Not found");
    }

    res.json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = removeById;