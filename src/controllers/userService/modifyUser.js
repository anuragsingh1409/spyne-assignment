const User = require("../../models/User");

const { generateAccessToken } = require("../../middlewares/auth");

const updateUser = async (req, res) => {
  try {
    const { name, mobileNo, email } = req.body;
    const { _id: userId } = req.user;

    const existingUser = await User.findOne({
      $or: [{ email: email.trim().toLowerCase() }, { mobileNo }],
    });

    if (existingUser) {
      return res
        .status(400)
        .json(
          createResponse(
            false,
            "Mobile or email already in use, can't be updated"
          )
        );
    }

    const updatedUser = await User.findByIdAndUpdate(userId, {
      $set: { name, mobileNo, email },
    });

    const savedUser = await updatedUser.save();

    // Re-creating access token to update token
    const accessToken = generateAccessToken(savedUser);
    return res
      .status(200)
      .json(
        createResponse(true, "User details updated successfully", {
          accessToken,
          savedUser,
        })
      );
  } catch (err) {
    console.error(`Error: ${err}`);
    return res
      .status(400)
      .json(createResponse(false, "Syntax or variable problem.", null, err));
  }
};

const deleteUser = async (req, res) => {
  try {
    const { _id: userId } = req.user;

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(400).json(createResponse(false, "User does not exist"));
    }

    return res
      .status(200)
      .json(createResponse(true, "User successfully deleted"));
  } catch (err) {
    console.error(`Error: ${err}`);
    return res
      .status(500)
      .json(createResponse(false, "Some server error occurred!", null, err));
  }
};

module.exports = { updateUser, deleteUser };
