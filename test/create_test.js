const assert = require('assert');
const UserModel = require('../src/user');

describe('saves a user', () => {
    it('successfully adds the user to the database', (done) => {
        const newUser = UserModel({ name: "Charlie" });

        newUser.save()
            .then(() => {
                assert(!newUser.isNew); // if the record has been saved, the .isNew flag will be false
                done(); // this is super important--test won't work right otherwise
            })
    })
})