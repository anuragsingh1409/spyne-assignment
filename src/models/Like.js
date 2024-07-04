const mongoose = require("mongoose");
const { Schema } = mongoose;

const likeSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    commentId: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      required: true,
    },
  },
  { timestamps: true }
);

const LikeOnComment = mongoose.model("likeOnCommentSchema", likeSchema);

module.exports = LikeOnComment;
