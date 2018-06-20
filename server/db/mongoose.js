var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/MeanApp').then(() => {
  console.log('Connected To Database!');
}, (error) => {
  console.log('Connection To Database Failed!');
});

module.exports = {
  mongoose
};
