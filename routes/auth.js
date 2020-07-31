const express = require('express');
const router = express.Router();

// Get logged in user
router.get('/', (req, res) => {
  res.status(200).send({ msg: 'Hello Auth' });
});

// Auth User and get token
router.post('/', (req, res) => {
  res.status(200).send({ msg: 'Hello Auth' });
});

module.exports = router;
