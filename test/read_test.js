const assert = require('assert');
const UserModel = require('../src/user');

describe('Reading users out of the database', () => {
    // here we declare the newUser so that it can be accessed by all the It blocks
    let newUser;

    // beforeEach will save a user to the database before each test runs so that it can query for the user record
    beforeEach((done) => {
        newUser = UserModel({ name: "Charlie" });
        newUser.save()
            .then(() => done()) // calls done when the user is saved so that the test moves onto the next It block
    })

    it('finds all users with the name of Charlie', (done) => {
        UserModel.find({ name: "Charlie" })
            .then(users => {
                // asserting by checking IDs makes sure that the newUser we just created is the same one that we find
                assert(users[0]._id.toString() === newUser._id.toString()); // you always have to chain a .toString() function onto a record's ID you want to reference in Mongo
                done();
            });    
    })

    it('find a single user with the name of Charlie', (done) => {
        UserModel.findOne({ name: "Charlie" })
            .then(record => {
                assert(record._id.toString() === newUser._id.toString());
                done();
            })
    })

    it('finds a user with a particular ID', (done) => {
        UserModel.findOne({ _id: newUser._id })
            .then(record => {
                assert(record.name === "Charlie");
                done();
            })
    })
})