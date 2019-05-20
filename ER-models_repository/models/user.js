var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema(
    {
        nickname: { type: String},
        first_name: { type: String},
        family_name: { type: String},
        posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
    }
);

module.exports = mongoose.model('User', userSchema);