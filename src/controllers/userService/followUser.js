const User = require("../../models/User");


const followUser = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const { userId: targetUserId } = req.params;

    if (targetUserId === userId) {
      return res
        .status(422)
        .json(createResponse(false, "You can't follow yourself", null));
    }

    const alreadyFollowing = await User.findOne({
      _id: userId,
      following: { $in: targetUserId },
    });

    if (alreadyFollowing) {
      return res
        .status(422)
        .json(createResponse(false, "Already following this user", null));
    }

    await Promise.all([
      User.findByIdAndUpdate(
        userId,
        { $addToSet: { following: targetUserId } },
        { new: true }
      ),
      User.findByIdAndUpdate(
        targetUserId,
        { $addToSet: { followers: userId } },
        { new: true }
      ),
    ]);

    return res
      .status(200)
      .json(
        createResponse(true, "Successfully followed the user", {
          isFollowing: true,
        })
      );
  } catch (err) {
    console.error(`Error: ${err}`);
    return res
      .status(500)
      .json(createResponse(false, "Some server error occurred!", null, err));
  }
};

module.exports = { followUser };
