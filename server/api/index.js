const express = require('express');
const router = new express.Router();

// array to store the strings
let strings = [];

/** GET / fetch all strings
 * returns [str1, str2 ...]
 */
router.get('/', function (req, res, next) {
  return res.json(strings);
});

/**
 * POST / prepend a new string to the array.
 * returns the array with the new string prepended
 */
router.post('/add', function(req, res) {
  const newString = req.body;

  if (!newString.text) {
    const error = {
      message: 'Invalid string',
      status: 400,
    };
    throw error;
  }
  strings = [newString, ...strings];
  return res.json(strings);
});

module.exports = router;
