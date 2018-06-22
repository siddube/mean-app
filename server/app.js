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
  post.save().then((doc) => {
    res.status(201).json({message: 'Post Added', postId: doc._id});
  });

});

app.get('/api/posts', (req, res, next) => {
  Post.find({}).then((docs) => {
    res.status(200).send({posts: docs});
  }, (e) => {
    res.send(e)
  });
});

app.get('/api/posts/:id', (req, res, next) => {
  Post.findById(req.params.id).then((doc) => {
    res.status(200).send({post: doc});
  }, (e) => {
    res.send(e)
  });
});

app.delete('/api/posts/:id', (req, res, next) => {
  Post.findOneAndRemove({_id: req.params.id}).then(() => {
    res.status(201).json({message: 'Post Deleted'});
  }, (e) => {
    res.send(e)
  });
});

app.patch('/api/posts/:id', (req, res, next) => {
  const post = {
    title: req.body.title,
    message: req.body.message
  }
  Post.findOneAndUpdate({_id: req.params.id}, {$set: post}, {new: true}).then(() => {
    res.status(201).json({message: 'Post Edited'});
  }, (e) => {
    res.send(e)
  });
});

module.exports = app;
