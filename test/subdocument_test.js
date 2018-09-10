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
    });

    it('adds a subdocument to an existing record', (done) => {
      const newUser = new UserModel({
          name: "Charlie"
      });

      newUser.save()
        .then(() => UserModel.findOne({ name: "Charlie" }))
        .then(record => {
            record.posts.push({ title: 'new post' });
            record.save()
                .then(UserModel.findOne({ posts: [{ title: 'new post' }]}))
                .then(updatedRecord => {
                    assert(updatedRecord.posts[0].title === 'new post');
                    done();
                });
        });
    });

    it('removes a subdocument from an existing record', (done) => {
        const newUser = new UserModel({
            name: "Charlie",
            posts: { title: 'post title' }
        });
  
        newUser.save()
          .then(() => UserModel.findOne({ name: "Charlie" }))
          .then(record => {
              record.posts[0].remove();
              record.save()
                .then(() => UserModel.findOne({ name: "Charlie" }))
                .then(updatedRecord => {
                    assert(updatedRecord.posts.length === 0);
                    done();
                })
          })
      });
});

