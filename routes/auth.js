const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res, next) => {
  const { email, password } = req.body;
  //req.session.user = { name: 'test', email };
  res.redirect('/');
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/'));
});

module.exports = router;