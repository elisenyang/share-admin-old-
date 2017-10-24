var express = require('express');
var router = express.Router();
var models = require('../models/models');
var User = models.User;
var Post = models.Post;


router.get('/home', function (req, res) {
  Post.find(function (err, posts) {
    console.log(posts)
    res.json({posts: posts})
  })
})

module.exports = router;