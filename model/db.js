var mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/patch');

var userSchema = new mongoose.Schema({
  name: String,
  password: String,
  email: String,
  friends: [],
  statuses: []
});

module.exports = db.model('users', userSchema);