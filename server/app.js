const express = require('express');
const body_parser = require('body-parser');

const app = express();

app.use(body_parser.json());
app.use(body_parser.urlencoded({extended: false}));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});

app.post('/api/posts', (req, res, next) => {
  const post = req.body;
  console.log(post);
  res.status(201).json({message: 'Post Added'});
});

app.get('/api/posts', (req, res, next) => {
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
