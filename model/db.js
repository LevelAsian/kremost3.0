var mongoose = require('mongoose');

var db = mongoose.connect('mongodb://admin:admin@ds031608.mongolab.com:31608/heroku_app16560192');

var userSchema = new mongoose.Schema({
  name: String,
  password: String,
  email: String,
  friends: [],
  statuses: []
});

module.exports = db.model('users', userSchema);