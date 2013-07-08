var mongoose = require('mongoose');


var db = mongoose.connect('mongodb://localhost/kremosto4');


var userSchema = new mongoose.Schema({
  name: String,
  password: String,
  email: String,
  friends: [],
  friend_requests: [],
  statuses: [{
      text: String,
      startdate:{ type: Date, default: Date.now },
      enddate: { type: Date, default: Date.now }
  }]
});

module.exports = db.model('users', userSchema);