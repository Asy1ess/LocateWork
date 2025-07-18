const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Welcome to LocateWork Service');
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
