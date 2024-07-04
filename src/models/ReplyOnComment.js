const mongoose = require("mongoose");
const { Schema } = mongoose;

const replyOnCommentSchema = new Schema(
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
    text: {
      type: String,
      required: [true, "Text is required"],
      trim: true,
    },
  },
  { timestamps: true }
);

const ReplyOnCommentModel = mongoose.model(
  "ReplyOnComment",
  replyOnCommentSchema
);

module.exports = ReplyOnCommentModel;
