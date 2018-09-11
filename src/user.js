const mongoose = require('mongoose');
const PostSchema = require('./PostSchema');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        validate: {
            validator: (name) => name.length > 2, // this function validates every entry
            message: 'Name must be longer than 2 characters',
        },
        required: [true, 'Name is required.']
    },
    posts: [PostSchema],
    likes: Number,
    blogPosts: [{
        type: Schema.Types.ObjectId,
        ref: "blogPosts"
    }]
})

// here we're adding Virtual Property that will calculate the number of posts in our posts array
UserSchema.virtual('postCount').get(function(){
    // 'this' is referring to the instances of the Model that we reference, so...
    // ...it will return the number of posts that any record we access holds
    return this.posts.length; 
})

const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;