var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

/* GET home page. */



var url = 'mongodb://localhost:27017/CBIT';

var db = mongoose.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to Connect to Database Server', err);
  } else {
    console.log('Connection Established to Database Server');
  }
});

var Schema1 = new mongoose.Schema({
  //_id: String,
  name: String,
  roll: Number,
  department: String
},{ collection: 'studentData' });

var user = mongoose.model("studentData",Schema1);

router.get('/', function(req, res, next) {
  new user({
    name: "",
    roll: 0,
    department: ""
  }).save(function (err, doc) {
        if (err)
          res.json(err);
      });
  res.render('index', {
    title: 'Student DataBase Manager'
  });
});


router.post('/setData',function(req,res) {
  var uname = req.body.name;
  var uroll = req.body.roll;
  var udept = req.body.dept;
  console.log(uname,uroll,udept);
  new user({
    name: uname,
    roll: uroll,
    department: udept
  }).save(function (err, doc) {
        if (err)
          res.json(err);
        else
          res.status(200).json("Saved");
          /*res.render('index', {
          title: 'Student DataBase Manager',
          userData:user
        });*/
      })
});


router.post('/getData',function(req,res) {
  var vname = req.body.name;
  console.log(vname);

    user.find({name: vname}, function (err, user) {
      if (err) {
        console.log("error Login");
        handleError(res, err.message, "Failed to Load Data.");
      }
      else {
        if (!user) {
          res.status(200).send("Invalid User");
        }
        else {
          console.log(user);
          res.status(200).json(user);
          /*res.render('index', {
            title: 'Student DataBase Manager',
            userData:user[0]
          });*/
        }
      }
    });
});

router.post('/getAllData',function(req,res) {
  //console.log("All");
  user.find({}, function (err, user) {
    if (err) {
      console.log("error Login");
      handleError(res, err.message, "Failed to Load Data.");
    }
    else {
      res.status(200).json(user);
      /*res.render('index', {
        title: 'Student DataBase Manager',
        userData: user[0]
      });*/
    }
  });
});

module.exports = router;
