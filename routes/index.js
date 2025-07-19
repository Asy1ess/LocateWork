const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  // 로그인 여부에 따라 다른 뷰 렌더
  if (req.session.user) {
    return res.render('index', { user: req.session.user });
  }
  res.render('login');
});

module.exports = router;