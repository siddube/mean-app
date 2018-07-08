const express = require('express');
const multer = require('multer');

const  { Post } = require('./../models/posts');

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};

const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let err = new Error('Invalid Mime Type');
    if(isValid) {
      err = null;
    }
    cb(err, 'server/images');
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLocaleLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});

router.post('', multer({storage: storage}).single('image'), (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const post = new Post({
    title: req.body.title,
    message: req.body.message,
    imagePath: url + "/images/" + req.file.filename
  });
  post.save().then((createdPost) => {
    res.status(201).json({
      message: 'Post Added', 
      post: {
        id: createdPost._id,
        title: createdPost.title,
        message: createdPost.message,
        imagePath: createdPost.imagePath
      }
    });
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
