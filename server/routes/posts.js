const express = require('express');
const router = express.Router();

const  { Post } = require('./../models/posts');

router.post('', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    message: req.body.message
  });
  post.save().then((doc) => {
    res.status(201).json({message: 'Post Added', postId: doc._id});
  });

});

router.get('', (req, res, next) => {
  Post.find({}).then((docs) => {
    res.status(200).send({posts: docs});
  }, (e) => {
    res.send(e)
  });
});

router.get('/:id', (req, res, next) => {
  Post.findById(req.params.id).then((doc) => {
    res.status(200).send({post: doc});
  }, (e) => {
    res.send(e)
  });
});

router.delete('/:id', (req, res, next) => {
  Post.findOneAndRemove({_id: req.params.id}).then(() => {
    res.status(201).json({message: 'Post Deleted'});
  }, (e) => {
    res.send(e)
  });
});

router.patch('/:id', (req, res, next) => {
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

module.exports = { router };
