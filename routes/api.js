var User = require('../model/db');

exports.GetOneUser = function(req, res) {
    User.findOne({email: req.params.email}, function(err, docs) {
        res.json(docs);
    });
};

exports.queryforusers = function(req, res){
    User.findOne({email: req.params.email}, function(err, docs) {
        if (docs !== null){
            res.send({
                email: docs.email
            })
        } else {
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
    console.log(req.body);
    var user = new User({ email: req.body.email, name: req.body.name, password: req.body.password});

    user.save(function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log('new user: ' + user.name );
        }
    });
    res.redirect('/login');
}

exports.addstatus = function(req, res){

    var startdate = new Date();
    // en status varer i 16 timer.

    var enddate = new Date(startdate.getTime() + (16*60*60*1000));

    console.log("stardate api: " + startdate.getTime());
    console.log(req.body.status);



    User.update({email: req.body.email}, {$push: {"statuses": {text: req.body.text, startdate: startdate, enddate: enddate}}}, function(err, docs){
        res.send(docs);
    });
}



exports.comment = function(req, res){
    var startdate = new Date();

    console.log(req.body);

    console.log('id: ' + req.body._id);
    console.log('Status: ' + req.body.text);
    console.log('New comment: ' +req.body.newcomment);
    console.log('By: '+ req.body.commenter);
    console.log('Date: ' +startdate);


    User.update({'statuses._id': req.body._id}, { $push: {"comments": {
            text: req.body.newcomment,
            commentToStatus: req.body._id,
            by: req.body.commenter,
            added: startdate
        }}},
        function(err, docs){
                //res.send(docs);

            }
        )
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

    User.findOne({email: req.params.email}, function(err, user){
        user.statuses.forEach(function(status){
            var enddate = new Date(status.enddate);
            if(enddate<date){
                // Her slettes statusene
                User.update({email: user.email}, {$pull: {statuses:{_id:status._id}}}).exec();
                User.update({email: user.email}, {$pull: {comments:{commentToStatus: status._id}}}).exec();
            }
        })
    });
    res.send();
}
