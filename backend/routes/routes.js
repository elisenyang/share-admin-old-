var express = require('express');
var router = express.Router();
var models = require('../models/models');
var User = models.User;
var Post = models.Post;


router.get('/home', function (req, res) {
  Post.find(function (err, posts) {
    var arr = [...posts]
    var sorted = arr.sort(function(a,b) {
      if (b.date > a.date) {
        return 1
      }
      if (b.date < a.date) {
        return -1
      }
    });
    res.json({posts: sorted})
  });
})

router.post('/deletePost', function (req, res) {
  Post.remove({ _id:req.body.postId}, function(err) {
    if (err) {
      res.json({error: err.message})
    }
    Post.find(function(err, posts) {
      if (err) {
        console.log(err)
      }
      var arr = [...posts]
      var sorted = arr.sort(function(a,b) {
        if (b.date > a.date) {
          return 1
        }
        if (b.date < a.date) {
          return -1
        }
      });
      res.json({success: true, posts: sorted})
    });
  })
})


router.get('/comments/:postId', function(req, res) {
  Post.findById(req.params.postId, function (err, post) {
    res.json({success: true, comments: post.replies, post: JSON.stringify(post)})
  })
})

router.post('/deleteComment', function(req, res) {
  Post.findById(req.body.postId, function(err, doc) {
    var replies = [...doc.replies]
    var index;
    replies.forEach((comment) => {
      if (comment.id === req.body.commentIndex) {
        index = replies.indexOf(comment)
      }
    })
    replies.splice(index, 1)
    doc.replies = replies
    doc.save(function (err) {
      if (err) {
        res.json({success: false})
      } else {
        res.json({success: true})
      }
    })
  })
})

module.exports = router;