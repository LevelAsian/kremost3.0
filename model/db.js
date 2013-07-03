var mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/kremosto');


var userSchema = new mongoose.Schema({
  name: String,
  password: String,
  email: String,
  friends: [],
  statuses: [{
      text: String,
      startdate:{ type: Date, default: Date.now },
      enddate: { type: Date, default: Date.now }
  }]
});

module.exports = db.model('users', userSchema);