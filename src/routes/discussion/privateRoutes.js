const express = require("express");
const router = express.Router();
const upload = require("../../serviceConfig/multerConfig");
const {
  createDiscussion,
} = require("../../controllers/discussionService/createDiscussion");
const {
  updateDiscussion,
  deleteDiscussion,
} = require("../../controllers/discussionService/modifyDiscussion");
const {
  likeDiscussion,
  likeComment,
} = require("../../controllers/discussionService/likeOperation");
const {
  addCommentToDiscussion,
  addReplyToComment,
} = require("../../controllers/discussionService/comment");

// Create discussion
router.post(
  "/create-discussion",
  upload.fields([{ name: "image", maxCount: 1 }, { name: "otherImages" }]),
  createDiscussion
);

// Update discussion
router.put(
  "/update-discussion/:discussionId",
  upload.fields([{ name: "image", maxCount: 1 }, { name: "otherImages" }]),
  updateDiscussion
);

// Delete discussion
router.delete("/delete-discussion/:discussionId", deleteDiscussion);

// Like discussion
router.put("/like-discussion/:discussionId", likeDiscussion);

// Comment on discussion
router.put("/comment-on-discussion/:discussionId", addCommentToDiscussion);

// Reply on comment
router.put("/reply-on-comment/:commentId", addReplyToComment);

// Like on comment
router.put("/like-on-comment/:commentId", likeComment);

module.exports = router;
