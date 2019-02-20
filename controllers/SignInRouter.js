const express = require('express');
const router = express.Router();
const generateResponseObject = require('../lib/generateResponseObject');
const SignInModel = require('../models/SignInModel');

router.get('/', (req, res) => {
  res.render('signin_signup/signin', {title: 'Sign In'});
});

router.post('/', async (req, res) => {
  try {
    let response = await SignInModel.signIn(req.body);
    res.status(200).send(JSON.stringify(response));
  } catch (error) {
    res.status(500).send(JSON.stringify(generateResponseObject(false, error.message, null)));
  }
});

module.exports = router;
