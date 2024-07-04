const express = require("express");
const router = express.Router();

const {
    fetchAllDiscussions,
    fetchDiscussion,
    fetchDiscussionsByTextSearch,
  fetchDiscussionsByTags,
} = require("../../controllers/discussionService/discussionOperations");

router.get("/get-all-discussions", fetchAllDiscussions);
router.get("/get-discussion/:discussionId", fetchDiscussion);
router.get("/get-discussion-by-text-search/:text", fetchDiscussionsByTextSearch);
router.get("/get-discussion-by-tags", fetchDiscussionsByTags); // Pass tags in query

module.exports = router;
