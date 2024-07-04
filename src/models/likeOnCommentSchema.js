const mongoose = require("mongoose");
const { Schema } = mongoose;

const likeOnCommentSchema = new Schema(
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

const LikeOnCommentModel = mongoose.model("LikeOnComment", likeOnCommentSchema);

module.exports = LikeOnCommentModel;
