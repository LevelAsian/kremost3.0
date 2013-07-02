var User = require('../model/db');

exports.login = function(req, res) {
  User.findOne({email: req.params.email}, function(err, docs) {
    res.json({
      name: docs.name,
      password: docs.password,
      email: docs.email,
      friends: docs.friends
    });
  });
};

exports.friends = function(req, res) {
  User.findOne({email: req.params.email}, function(err, docs) {
    User.where('email').in(docs.friends).exec(function(err2, friends) {
      res.send(friends)
    });
  });
};

exports.register = function(req, res) {
    User.create(req.body, function(err, user){
        res.send(user);
    })
}

exports.addstatus = function(req, res){
    console.log("new status: " + req.body.text);
    console.log("email: " + req.body.email);

    var date = new Date();


    User.update({email: req.body.email}, {$push: {"statuses": {text: req.body.text, date: date}}}, function(err, docs){
        res.send(docs);
    });
}

exports.friend = function(req, res) {
  User.findOne({email: req.params.email}, function(err, docs) {
    res.send(docs)
  });
};

exports.addfriend = function(req, res){
    console.log("friend email: " + req.body.friendemail);
    console.log("user email: " + req.body.CurrentUserMail);

    User.update({ email: req.body.CurrentUserMail},
        {$push: {'friends': req.body.friendemail }},
        function(err, user){
            res.send(user);
        })
}

