const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const updateContactsFile = async (contacts) =>
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const oneContact = contacts.find((item) => item.id === contactId);

  return oneContact || null;
};

const addContact = async (body) => {
  const contacts = await listContacts();

  const newContact = {
    id: nanoid(),
    ...body,
  };

  contacts.push(newContact);
  await updateContactsFile(contacts);

  return newContact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }

  const [deletedContact] = contacts.splice(index, 1);
  await updateContactsFile(contacts);

  return deletedContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }

  contacts[index] = { contactId, ...body };
  await updateContactsFile(contacts);

  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
