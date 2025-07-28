const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  if (req.session.user) {
    return res.render('index', { title: '메인 페이지', user: req.session.user });
  }
  res.render('login', { title: '로그인 페이지 '});
});

module.exports = router;