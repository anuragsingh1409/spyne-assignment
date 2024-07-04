const Discussion = require("../../models/Discussion");
const Like = require("../../models/Like");
const likeOnCommentSchema = require("../../models/likeOnCommentSchema");
const Comment = require("../../models/Comment");



const likeDiscussion = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const { discussionId } = req.params;

    const newLike = await new Like({
      userId,
      discussionId,
    }).save();

    const [discussionLikes] = await Promise.all([
      Discussion.findById(discussionId, { likeBy: 1 }),
      Discussion.findByIdAndUpdate(discussionId, {
        $addToSet: { likeBy: newLike._id },
      }),
    ]);

    return res.status(200).json(
      createResponse(true, "Successfully liked discussion", {
        totalLikes: (discussionLikes?.likeBy?.length || 0) + 1,
      })
    );
  } catch (err) {
    console.error(`Error: ${err}`);
    return res
      .status(500)
      .json(createResponse(false, "Some server error occurred!", null, err));
  }
};

const likeComment = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const { commentId } = req.params;

    const newLike = await new likeOnCommentSchema
    ({
      userId,
      commentId,
    }).save();

    const [commentLikes] = await Promise.all([
      Comment.findById(commentId, { likeOnCommentSchema: 1 }),
      Comment.findByIdAndUpdate(commentId, {
        $addToSet: { likeOnCommentSchema: newLike._id },
      }),
    ]);

    return res.status(200).json(
      createResponse(true, "Successfully liked the comment", {
        totalLikes: (commentLikes?.likeOnCommentSchema?.length || 0) + 1,
      })
    );
  } catch (err) {
    console.error(`Error: ${err}`);
    return res
      .status(500)
      .json(createResponse(false, "Some server error occurred!", null, err));
  }
};

module.exports = { likeDiscussion, likeComment };
