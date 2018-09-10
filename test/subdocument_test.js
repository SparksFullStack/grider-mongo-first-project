const assert = require('assert');
const UserModel = require('../src/user');

describe('Testing Sub-Documents', () => {
    it('creates a subdocument and saves it', (done) => {
        const newUser = new UserModel({
            name: "Charlie",
            posts: [{ title: 'testing adding a post!' }]
        });

        newUser.save()
            .then(() => {
                UserModel.findOne({ name: "Charlie" })
                    .then(record => {
                        assert(record.posts[0].title === 'testing adding a post!');
                        done();
                    })
            })
    })
});