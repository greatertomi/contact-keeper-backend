const { body } = require('express-validator');
exports.loginValidation = [
  body('email', 'Please include a valid email').isEmail(),
  body('password', 'Password is required').exists()
];

exports.createUserValidation = [
  body('name', 'Please add name').not().isEmpty(),
  body('email', 'Please include a valid email').isEmail(),
  body(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({
    min: 5
  })
];

exports.createContactValidation = [
  body('name', 'Name is required').not().isEmpty()
];
