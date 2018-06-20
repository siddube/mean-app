const express = require('express');
const body_parser = require('body-parser');

const { mongoose } = require('./db/mongoose');
const  {Post } = require('./models/posts');

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
  const post = new Post({
    title: req.body.title,
    message: req.body.message
  });
  post.save();
  res.status(201).json({message: 'Post Added'});
});

app.get('/api/posts', (req, res, next) => {
  Post.find({}).then((docs) => {
    res.status(200).send({posts: docs});
  });
});

app.delete('/api/posts/:id', (req, res, next) => {
  Post.deleteOne({_id: req.params.id}).then(() => {
    res.status(200).json({message: 'Post Deleted'});
  });
});

module.exports = app;
