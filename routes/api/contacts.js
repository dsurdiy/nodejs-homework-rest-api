const express = require("express");

const router = express.Router();

const contacts = require("../../models/contacts");

const { requestError } = require("../../helpers");

const { contactSchema } = require("../../schemas/contacts");

router.get("/", async (req, res, next) => {
  try {
    const allContacts = await contacts.listContacts();
    res.json(allContacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const oneContact = await contacts.getContactById(id);
    if (!oneContact) {
      throw requestError(404, "Not found");
    }

    res.json(oneContact);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw requestError(400, "Missing required name field");
    }

    const newContact = await contacts.addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
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
});

router.put("/:id", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw requestError(400, "Missing fields");
    }

    const { id } = req.params;
    const updatedContact = await contacts.updateContact(id, req.body);
    if (!updatedContact) {
      throw requestError(404, "Not found");
    }

    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
