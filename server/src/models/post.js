import mongoose, { Schema } from "mongoose";

const PostSchema = new Schema({
  like: { type: Number, default: 0 },
  category: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  comments: { type: Number, default: 0 },
  author: {
    type: {
      userId: { type: mongoose.Types.ObjectId, required: true },
      nickname: { type: String, required: true }
    }, required: true
  },
  publishedDate: {
    type: Date,
    default: Date.now
  }
});

const Post = mongoose.model('Post', PostSchema);
export default Post;