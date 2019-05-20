var express = require('express');
var router = express.Router();
var Post = require('../models/post');
var User = require('../models/user');

// Требующиеся модули контроллеров.
var post_controller = require('../controllers/postController');

// GET catalog home page. 
//router.get('/', post_controller.index);
//module.exports = router;

router.get('/', function (req, res) {
    res.render('index', { title: 'тут пока пустовато' });
});

router.get('/posts', post_controller.postList);
router.get('/post/create', post_controller.postCreate_get);
router.post('/post/create', post_controller.postCreate_post);

// GET request for one post.
router.get('/post/:id', post_controller.postDetail);

// POST request to delete post.
router.post('/post/:id/delete', post_controller.postDelete_post);

// POST request to edit post.
router.post('/post/:id/edit', post_controller.postEdit_post);

module.exports = router;
