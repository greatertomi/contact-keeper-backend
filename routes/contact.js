const express = require('express');
const router = express.Router();

// @route   POST api/contact
// @desc    Get all Users contacts
router.get('/', (req, res) => {
  res.status(200).send({ msg: 'Hello Contact' });
});

// @route   GET api/contact
// @desc    Create Contact
router.post('/', (req, res) => {
  res.status(200).send({ msg: 'Hello Contact' });
});

// @route   PUT api/contact/:id
// @desc    Update contact
router.put('/:id', (req, res) => {
  res.status(200).send({ msg: 'Hello Contact' });
});

// @route   POST api/contacts/:id
// @desc    Delete Contact
router.delete('/', (req, res) => {
  res.status(200).send({ msg: 'Hello Contact' });
});
module.exports = router;
