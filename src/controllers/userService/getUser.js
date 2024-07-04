const User = require("../../models/User");


const getUserByName = async (req, res) => {
  try {
    const { name } = req.params;
    const user = await User.findOne({ name: { $regex: name, $options: "i" } });

    if (!user) {
      return res
        .status(404)
        .json(createResponse(false, "User not found", null));
    }

    return res
      .status(200)
      .json(createResponse(true, "User successfully fetched", user));
  } catch (err) {
    console.error(`Error: ${err}`);
    return res
      .status(500)
      .json(createResponse(false, "Some server error occurred!", null, err));
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    if (!users) {
      return res
        .status(404)
        .json(createResponse(false, "Users not found", null));
    }

    return res
      .status(200)
      .json(createResponse(true, "Users successfully fetched", users));
  } catch (err) {
    console.error(`Error: ${err}`);
    return res
      .status(500)
      .json(createResponse(false, "Some server error occurred!", null, err));
  }
};

module.exports = { getUserByName, getAllUsers };
