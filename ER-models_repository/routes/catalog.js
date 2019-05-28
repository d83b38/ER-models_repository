var express = require('express');
var router = express.Router();
var Post = require('../models/post');
var User = require('../models/user');
var userLoad = require('../routes/userLoad');
var mongoose = require('mongoose');

router.get('/', function (req, res) {
    res.render('index', { title: 'тут пока пустовато' });
});

router.get('/posts', function (req, res) {
    Post.find({}, 'name user model')
        .populate('user')
        .populate('model')
        .exec(function (err, list_posts) {
            if (err) { return next(err); }
            res.render('postList', { title: 'All Posts List', post_list: list_posts });
        });
});

router.get('/post/create', userLoad.verifyToken, function (req, res) {
    var data = req.data;
    data.title = 'User profile';
    res.render('createOrEdit', { title: 'Create post', user: data.user, token: data.token});
});

router.post('/post/create/:token', async function (req, res) {
    console.log(req.body);
    var data = req.body;
    newPostID = new mongoose.Types.ObjectId();
    try {
        await User.findByIdAndUpdate(data.userID, { $push: { posts: newPostID } });
        var newPost = new Post(
            {
                _id: newPostID,
                name: data.name,
                user: data.userID,
                model: {
                    relationships: data.relationships
                }
            }
        );
        console.log('success1');
        try {
            await newPost.save();
            console.log('success2');
        } catch (err) {
            console.log(err);
        }
    return res.end('done');   
    } catch (e) {
        console.log(err);
    }
});

// GET request for one post.
router.get('/post/:id', function (req, res, next) {
    //console.log(req.params.id);
    var data = req.data;
    Post.findById(req.params.id)
        .populate('user')
        .populate('comments.user', 'login')
        .exec(function (err, results) {
            if (err) { return next(err); }
            if (results === null) {
                err = new Error('Post not found');
                err.status = 404;
                return next(err);
            }
            console.log(results);
            res.render('postDetail', { title: 'Post', currUser: data.user, post: results });
        });
});
// POST request to delete post.
router.post('/post/:id/delete',async function (req, res) {
    console.log('запрос на удаление получен');
    console.log(req.params.id);

    var data = req.body;
    console.log(data.authorID);
    try {
        await User.findByIdAndUpdate(data.authorID, { $pull: { posts: req.params.id } });

        console.log('success1');
        try {
            await Post.findByIdAndRemove(req.params.id);
            console.log('success2');
        } catch (err) {
            console.log(err);
        }
        
        res.redirect('/catalog/posts');
    } catch (e) {
        console.log(e);
    }

});
// POST request to edit post.
router.post('/post/:id/edit', function (req, res) {
    console.log('request received');
    var data = [];
    data = req.body;
    Post.findByIdAndUpdate(req.params.id, { $set: { "model.relationships": data } }, {}, function (err) {
        if (err) { return next(err); }
        console.log('success');
    });
});

router.post('/post/:id/addComment/:token', function (req, res) {
    console.log('request received');

    var data = req.body;


    var comment = {
        content: data.commentText, user: data.userID
    };

    Post.findByIdAndUpdate(req.params.id, { $push: { comments: comment } }, {}, function (err) {
        if (err) { return next(err); }
        console.log('success');
    });
});


module.exports = router;
