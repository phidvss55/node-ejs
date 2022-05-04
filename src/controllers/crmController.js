import mongoose from 'mongoose';
import { ContactSchema } from '../models/crmModal.js';

const Contact = mongoose.model('Contact', ContactSchema); // 'Contact' is the name of the collection

const addNewContact = (req, res) => {
  const newContact = new Contact(req.body);
  newContact.save((err, contact) => {
    if (err) {
      res.send(err);
    }
    res.json(contact);
  });
};

const getAllContacts = (req, res) => {
  Contact.find({}, (err, contacts) => {
    if (err) {
      res.send(err);
    }
    res.json(contacts);
  });
};

const getOneContact = (req, res) => {
  Contact.findOne({ _id: req.params.contactId }, (err, contact) => {
    if (err) {
      res.send(err);
    }
    res.json(contact);
  });
};

const updateContact = (req, res) => {
  Contact.findOneAndUpdate({ _id: req.params.contactId }, req.body, { new: true }, (err, contact) => {
    if (err) {
      res.send(err);
    }
    res.json(contact);
  });
};

const deleteContact = (req, res) => {
  Contact.remove({ _id: req.params.contactId }, (err, contact) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: 'Successfully deleted contact' });
  });
};

export { addNewContact, getAllContacts, getOneContact, updateContact, deleteContact };
