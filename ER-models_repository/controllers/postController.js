var Post = require('../models/post');

// Показать список всех постов.
exports.postList = function (req, res) {
    Post.find({}, 'name user model')
        .populate('user')
        .populate('model')
        .exec(function (err, list_posts) {
            if (err) { return next(err); }
            console.log(list_posts);
            res.render('postList', { title: 'Post List', post_list: list_posts });
        });
};

// Показать подробную страницу для данного поста.
exports.postDetail = function (req, res, next) {
    //console.log(req.params.id);
    Post.findById(req.params.id)
        .populate('user')
        .exec(function (err, results) {
            if (err) { return next(err); }
            if (results === null) {
                var err = new Error('Post not found');
                err.status = 404;
                return next(err);
            }
            console.log(results);
            res.render('postDetail', { title: 'Title', post: results});
        });   
};
exports.postDetail = function (req, res, next) {
    //console.log(req.params.id);
    Post.findById(req.params.id)
        .populate('user')
        .exec(function (err, results) {
            if (err) { return next(err); }
            if (results === null) {
                var err = new Error('Post not found');
                err.status = 404;
                return next(err);
            }
            console.log(results);
            res.render('postDetail', { title: 'Title', post: results });
        });
};
//postDetailUpdate
exports.postEdit_post = function (req, res) {
    console.log('request received');
    var data = [];
    data = req.body;
    Post.findByIdAndUpdate(req.params.id, { $set: { "model.relationships": data } }, {}, function (err) {
        if (err) { return next(err); }
        // Successful - redirect to detail page.
        console.log('success');
    });
    //res.send('NOT IMPLEMENTED: Post edit post');
};

// Показать форму создания поста по запросу GET.
exports.postCreate_get = function (req, res) {
    res.render('createOrEdit');
};

// Создать пост по запросу POST.         
exports.postCreate_post = function (req, res) {
    console.log(req.body);
    var data = [];
    data = req.body;
    console.log(data[0].entity_1.name + 'received');

    var newPost = new Post(
        {
            name: 'tested1',
            model: {
                relationships: data
            }
        }
    );
    newPost.save(function (err) { if (err) console.log('Error on save!') });

    return res.end('done');
};

// Удалить поста по запросу POST.
exports.postDelete_post = function (req, res) {
    console.log('запрос на удаление получен');
    console.log(req.params.id);

    Post.findByIdAndRemove(req.params.id, function deletePost(err) {
        if (err) { return next(err); }
        // Success - got to books list.
        res.redirect('/catalog/posts');
    });
};

