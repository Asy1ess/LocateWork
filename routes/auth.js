const express = require('express');
const router = express.Router();
const User = require('../models/user')

router.get('/login', (req, res) => {
  res.render('login', { title: '로그인' });
});

router.post('/login', (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        return res.status(400).send('Invalid email or password');
      }
      if (user.password !== password) {
        return res.status(400).send('Invalid email or password');
      }

      req.session.user = { name: user.username, email: user.email };
      res.redirect('/');
    })
    .catch(err => {
      return res.status(500).send('Server error');
    });
});

router.get('/signup', (req, res) => {
  res.render('signup', { title: '회원가입' });
});

router.post('/signup', (req, res, next) => {
  const { username, email, password } = req.body;

  const newUser = new User({
    username,
    email,
    password,
  });

  newUser.save()
    .then(user => {
      req.session.user = { name: user.username, email: user.email };
      res.redirect('/');
    })
    .catch(err => {
      return res.status(500).send('Server error');
    });
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/'));
});

module.exports = router;