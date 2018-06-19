const express = require('express');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Contol-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

app.use('/api/posts', (req, res, next) => {
  const posts = [{
    id: '1safknkvot31kasv',
    title: 'First Post',
    message: 'This is a message from server'
  }, {
    id: 'axvnifhvoasjvqjg',
    title: 'Second Post',
    message: 'This is a message from server'
  }
];

res.status(200).send({posts});
});

module.exports = app;
