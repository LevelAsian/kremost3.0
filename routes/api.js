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

exports.friend_requests = function(req, res){
    User.findOne({email: req.params.email}, function(err, docs) {
        res.send(docs.friend_requests);
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

    var startdate = new Date();
    // en status varer i 16 timer.
    var enddate = new Date(startdate.getTime() + (16*60*60*1000));

    console.log("stardate api: " + startdate.getTime());

    User.update({email: req.body.email}, {$push: {"statuses": {text: req.body.text, startdate: startdate, enddate: enddate}}}, function(err, docs){
        res.send(docs);
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
        }
    );



    User.findOne({email: req.body.friendemail}, function(err, docs) {
        User.update({email: req.body.friendemail}, {$push: {"friend_requests": req.body.CurrentUserMail}},
            function(err, docs){
                res.send(docs);
            });

    });

}

exports.acceptRequest = function(req, res){

    console.log("user: " + req.body.currentmail);
    console.log("friend: " + req.body.email);

    User.update({email: req.body.currentmail},
        {$push: {'friends': req.body.email}},
        function(err, user){
        res.send(user);
    });
};


exports.deleteoldstatuses = function(req, res){

    var date = new Date();
    console.log(req.params.email);

    User.findOne({email: req.params.email}, function(err, user){
        user.statuses.forEach(function(status){
            var enddate = new Date(status.enddate);
            if(enddate<date){
                console.log("delete: " + status.text);
                // Her slettes statusene
                User.update({email: user.email}, {$pull: {statuses:{_id:status._id}}}).exec();
            }else{
                console.log("keep: " + status.text);
            }
        })
    });
    res.send();
}
























