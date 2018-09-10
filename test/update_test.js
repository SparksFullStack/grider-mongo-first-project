const assert = require('assert');
const UserModel = require('../src/user');

describe("Updating records", () => {
    let newUser;

    beforeEach((done) => {
        newUser = new UserModel({ name: "Charlie" });
        newUser.save()
            .then(() => done());
    })

    // assertName is a helper function that carries out all the promise chaining and testing in a single function
    function assertName(action, done) {
        action
            .then(() => {
                UserModel.find({})
                    .then(records => {
                        assert(records.length === 1);
                        assert(records[0].name === 'Doobs');
                        done();
                    })
            })
    }

    it('updates a record via an instance using set/save', (done) => {
        newUser.set('name', 'Doobs');
        assertName(newUser.save(), done); // instead of all the messy logic, we just call .save and pass it into assertName
    })

    it('updates a record via an instance using update', (done) => {
        assertName(newUser.update({ name: 'Doobs' }), done);
    })
})