const mongoose = require('mongoose');
const assert = require('assert');

// since we're testing associations, we need to import all three models that we'll be interacting with
const UserModel = require('../src/user')
const CommentModel = require('../src/CommentModel')
const BlogPostModel = require('../src/BlogPostModel');

describe('Testing relational data', () => {
    let newUser, newComment, newBlogPost;

    beforeEach((done) => {
        newUser = new UserModel({ name: "MacGruber" });
        newComment = new CommentModel({ content: "I'm sure I'll get it!" });
        newBlogPost = new BlogPostModel({ 
            title: "Figuring this out", 
            content: "Relational data in Mongo is tough!" 
        });

        // the blogPosts prop on the new user is an array, so we just have to push it
        // even though our 'blogPosts' prop is set to be equal to ObjectIds, we are able to...
        // ...just add the entire record and Mongoose will auto setup the reference
        newUser.blogPosts.push(newBlogPost);
        newBlogPost.comments.push(newComment);
        newComment.user = newUser;

        // here we'll save all three new records and make use of Promise.all() to wait for them all to resolve
        Promise.all([newUser.save(), newBlogPost.save(), newComment.save()])
            .then(() => done());
    });

    // here we make use of .populate to get all of the blogposts stored on the user record
    it('saves a relation between a user and a blogpost', (done) => {
        UserModel.findOne({ name: "MacGruber" })
            .populate('blogPosts')
            .then(response => {
                assert(response.blogPosts[0].title === 'Figuring this out');
                done();
            })
    });

    // tests that we can load deeply nested relational data
    it.only('loads all relational data between records', (done) => {
        UserModel.findOne({ name: "MacGruber" })
            .populate({
                path: 'blogPosts',
                populate: {
                    path: 'comments',
                    model: 'comments'
                }
            })
            .then(response => {
                console.log(response);
                done();
            })
    })
})

