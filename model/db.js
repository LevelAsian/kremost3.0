/*var mongoose = require('mongoose');


<<<<<<< HEAD
 var db = mongoose.connect('mongodb://localhost/kremosto3');
=======
var db = mongoose.connect('mongodb://localhost/kremosto4');
>>>>>>> 31f3936c8092bfdbb33f58c1a77dea77f9e7b46f


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

 module.exports = db.model('users', userSchema);  */

var mongoose = require('mongoose')
    , bcrypt = require('bcrypt')
    , SALT_WORK_FACTOR = 10;

mongoose.connect('mongodb://localhost/test123')
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    console.log('Connected to DB');
});

// User Schema
var userSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true},
    friends: [],
    friend_requests: [],
    statuses: [{
        text: String,
        startdate:{ type: Date, default: Date.now },
        enddate: { type: Date, default: Date.now }
    }]
});

// Bcrypt middleware
userSchema.pre('save', function(next) {
    var user = this;

    if(!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if(err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash) {
            if(err) return next(err);
            user.password = hash;
            next();
        });
    });
});

// Password verification
userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if(err) return cb(err);
        cb(null, isMatch);
    });
};

// Seed a user
var User = mongoose.model('User', userSchema);
var user = new User({ name: 'bob', email: 'bob@example.com', password: 'secret' });
user.save(function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log('user: ' + user.username + " saved.");
    }
});

module.exports = db.model('users', userSchema);