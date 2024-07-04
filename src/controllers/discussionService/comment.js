const Discussion = require("../../models/Discussion");
const Reply = require("../../models/ReplyOnComment");
const Comment = require("../../models/Comment");


const addCommentToDiscussion = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const { discussionId } = req.params;
    const { text } = req.body;

    const newComment = await new Comment({
      userId,
      discussionId,
      text,
    }).save();

    const [totalComments, updatedDiscussion] = await Promise.all([
      Discussion.findById(discussionId, { comments: 1 }).populate({
        path: "comments",
        select: "text",
      }),
      Discussion.findByIdAndUpdate(
        discussionId,
        {
          $addToSet: { comments: newComment._id },
        },
        { new: true }
      ),
    ]);

    return res.status(200).json(
      createResponse(true, "Comment added successfully", {
        totalComments,
        updatedDiscussion,
      })
    );
  } catch (err) {
    console.error(`Error: ${err}`);
    return res
      .status(500)
      .json(createResponse(false, "Some server error occurred!", null, err));
  }
};

const addReplyToComment = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const { commentId } = req.params;
    const { text } = req.body;

    const newReply = await new Reply({
      userId,
      commentId,
      text,
    }).save();

    const [totalReplies, updatedComment] = await Promise.all([
      Comment.findById(commentId, { replies: 1 }).populate({
        path: "replies",
        select: "text",
      }),
      Comment.findByIdAndUpdate(
        commentId,
        {
          $addToSet: { replies: newReply._id },
        },
        { new: true }
      ),
    ]);

    return res.status(200).json(
      createResponse(true, "Reply added successfully", {
        totalReplies,
        updatedComment,
      })
    );
  } catch (err) {
    console.error(`Error: ${err}`);
    return res
      .status(500)
      .json(createResponse(false, "Some server error occurred!", null, err));
  }
};

module.exports = { addCommentToDiscussion, addReplyToComment };
