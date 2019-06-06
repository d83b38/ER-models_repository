var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema(
    {
        name: { type: String},
        user: { type: Schema.Types.ObjectId, ref: 'User'},
        comments: [{
            content: String,
            user: { type: Schema.Types.ObjectId, ref: 'User'}
        }],

        model: {
            relationships: [{
                name: String,
                entity_1: {
                    name: String,
                    attributes: [String],
                    coordinates: [Number]
                },
                entity_2: {
                    name: String,
                    attributes: [String],
                    coordinates: [Number]
                },
                cardinality_1: [String],
                cardinality_2: [String]
            }]
        }
    }
);

postSchema
    .virtual('url')
    .get(function () {
        return '/catalog/post/' + this._id;
    });

module.exports = mongoose.model('Post', postSchema);