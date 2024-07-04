const mongoose = require("mongoose");
const { Schema } = mongoose;

const discussionSchema = new Schema(
  {
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    text: {
      type: String,
      required: [true, "Text is required"],
      minlength: [30, "Text should have at least 30 characters"],
      trim: true,
    },
    hashTags: [
      {
        type: String,
        trim: true,
      },
    ],
    thumbnail: { type: String, required: [true, "Thumbnail is required"] },
    otherImagesCount: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Like",
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

const Discussion = mongoose.model("Discussion", discussionSchema);

module.exports = Discussion;
