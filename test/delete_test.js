const assert = require('assert');
const UserModel = require('../src/user');

describe('Deleting a user record', () => {
    let newUser;

    beforeEach((done) => {
        newUser = new UserModel({ name: "Charlie" })
        newUser.save()
            .then(() => done());
    })

    it('deletes an instance of a model', (done) => {
        // used when we already have access to a record and want to remove it
        newUser.remove()
            .then(() => UserModel.findOne({ name: "Charlie" }))
            .then((record) => { // second .then won't be called until the UserModel.findOne has completed
                assert(record === null);
                done();
            })
    })

    it('deletes via the class remove method', (done) => {
        // used when we want to remove a bunch of records that have the same property
        UserModel.remove({ name: "Charlie" })
            .then(() => UserModel.findOne({ name: "Charlie" }))
            .then(record => {
                assert(record === null);
                done();
            })
    })

    it('deletes via the class findOneAndRemove method', (done) => {
        UserModel.findOneAndRemove({ name: "Charlie" })
            .then(() => UserModel.findOne({ name: "Charlie" }))
            .then(record => {
                assert(record === null);
                done();
            })
    })

    it('deletes via the class findByIdAndRemove method', (done) => {
        UserModel.findByIdAndRemove(newUser._id)
            .then(() => UserModel.findById(newUser._id))
            .then(record => {
                assert(record === null);
                done();
            })
    })
})