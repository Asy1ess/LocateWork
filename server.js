const express = require('express');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT;

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(expressLayouts);
app.set('layout', 'layout');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const MONGODB_URI = `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE}?authSource=${process.env.MONGODB_AUTH_SOURCE}`;

mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.error(err));

const indexRouter = require('./routes/index');
const authRouter  = require('./routes/auth');

app.use('/', indexRouter);
app.use('/auth', authRouter);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});