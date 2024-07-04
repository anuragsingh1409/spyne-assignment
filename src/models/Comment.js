const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    discussionId: {
      type: Schema.Types.ObjectId,
      ref: "Discussion",
    },
    text: {
      type: String,
      required: [true, "Text is required"],
      trim: true,
    },
    replies: [
      {
        type: Schema.Types.ObjectId,
        ref: "ReplyOnComment",
      },
    ],
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "likeOnCommentSchema",
      },
    ],
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
