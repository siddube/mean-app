const express = require('express');
const body_parser = require('body-parser');
const path = require('path')

const { mongoose } = require('./db/mongoose');
const  postRoutes  = require('./routes/posts').router;

const app = express();

app.use(body_parser.json());
app.use(body_parser.urlencoded({extended: false}));
app.use('/images', express.static(path.join('server/images')));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});

app.use('/api/posts', postRoutes);

module.exports = app;
