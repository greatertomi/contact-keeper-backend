const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { validationResult } = require('express-validator');

const User = require('../models/User');
const Contact = require('../models/Contact');
const { createContactValidation } = require('../middlewares/validators');

// @route   POST api/contact
// @desc    Get all Users contacts
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1
    });
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/contact
// @desc    Create Contact
router.post('/', [auth, createContactValidation], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, phone, type } = req.body;
  try {
    const newContact = new Contact({
      name,
      email,
      phone,
      type,
      user: req.user.id
    });

    const contact = await newContact.save();
    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ msg: 'Server Error' });
  }
});

// @route   PUT api/contact/:id
// @desc    Update contact
router.put('/:id', auth, async (req, res) => {
  const { name, email, phone, type } = req.body;

  const contactField = {};
  if (name) contactField.name = name;
  if (email) contactField.email = email;
  if (phone) contactField.phone = phone;
  if (type) contactField.type = type;

  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized 1' });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactField },
      { new: true }
    );
    res.status(200).send(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ msg: 'Server Error' });
  }
});

// @route   POST api/contacts/:id
// @desc    Delete Contact
router.delete('/:id', auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: 'Contact not found' });

    if (!contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized 1' });
    }

    await Contact.findByIdAndRemove(req.params.id);
    res.status(200).send({ msg: 'Contact removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ msg: 'Server Error' });
  }
});
module.exports = router;
