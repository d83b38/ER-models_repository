var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;

var userSchema = new Schema(
    {
        login: {
            type: String,
            unique: true,
            required: true
        },
        hashedPassword: {
            type: String,
            required: true
        },
        firstName: { type: String},
        lastName: { type: String },
        posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
    }
);


userSchema.virtual('password')
    .set(function (password) {
        this._plainPassword = password;
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function () { return this._plainPassword; });

userSchema.methods.encryptPassword = function (password) {
    return crypto.createHash('md5').update(password).digest('hex');
};

userSchema.methods.checkPassword = function (password) {
    return this.encryptPassword(password) === this.hashedPassword;
};

module.exports = mongoose.model('User', userSchema);