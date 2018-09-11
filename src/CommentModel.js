const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommentSchema = new Schema({
    content: String,
    user: { type: Schema.Types.ObjectId, ref: 'users' }
});

const CommentModel = mongoose.model('comments', CommentSchema);

module.exports = CommentModel;