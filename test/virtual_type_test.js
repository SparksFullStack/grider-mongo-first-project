const assert = require('assert');
const UserModel = require('../src/user');

describe('Virtual Types testing', () => {
    it('should get the total number of posts via the postCount() Virtual Property', (done) => {
        const newUser = new UserModel({
            name: "Charlie",
            posts: [{ title: 'post title' }]
        });

        newUser.save()
            .then(() => UserModel.findOne({ name: "Charlie" }))
            .then(record => {
                assert(record.postCount === 1);
                done();
            })
    })
})