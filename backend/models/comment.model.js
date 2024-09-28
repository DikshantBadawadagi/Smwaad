<<<<<<< HEAD
import mongoose from "mongoose";
const commentSchema = new mongoose.Schema({
    text: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
});
=======
import mongoose from "mongoose";
const commentSchema = new mongoose.Schema({
    text: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
});
>>>>>>> 6fa5ee436a07f107cb4d29c67bd2626acd18c259
export const Comment = mongoose.model('Comment', commentSchema);