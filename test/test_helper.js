const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// before ensures that the connection is made successfully to the database before running any tests
before((done) => {
    mongoose.connect('mongodb://localhost:27017/users_test');
    mongoose.connection
        .once('open', () => { done() }) // the way we call done is important here, as no test will run until it executes
        .on('error', (err) => console.warn('Error', err));
})

// beforeEach drops the data added by the test before each test runs
beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
        done(); // this signals that the dropping has finished
    })
})