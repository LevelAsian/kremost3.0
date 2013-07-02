var mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/kremosto');


var userSchema = new mongoose.Schema({
  name: String,
  password: String,
  email: String,
  friends: [],
  statuses: [{
      text: String,
      date: Date
  }]
});

module.exports = db.model('users', userSchema);