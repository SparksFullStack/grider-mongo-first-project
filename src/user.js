const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
})

const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;