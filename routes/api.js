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

exports.queryforusers = function(req, res){
    User.findOne({email: req.params.email}, function(err, docs) {
        if (docs !== null){
            console.log('if' + docs)
            res.send({
                email: docs.email
            })
        } else {
            console.log(req.params.email);
        }

    });
};

exports.updatefriendlist = function(req, res){
    User.findOne({email: req.params.email}, function(err, docs) {
        res.json({
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

    User.update({email: req.body.email}, {$push: {statuses: req.body.text}},
    function(err, user){
        res.send(user);
    });
}

exports.friend = function(req, res) {
  User.findOne({email: req.params.email}, function(err, docs) {
    res.send(docs)
  });
};

exports.addfriend = function(req, res){

    User.update({ email: req.body.CurrentUserMail},
        {$push: {'friends': req.body.friendemail }},
        function(err, user){
            res.send(user);
        })
}

