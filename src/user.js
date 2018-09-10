const mongoose = require('mongoose');
const PostSchema = require('./PostSchema');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        validate: {
            validator: (name) => name.length > 2, // this function validates every entry
            message: 'Name must be longer than 2 characters',
        }
    },
    posts: [PostSchema],
    postCount: Number,
})

const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;