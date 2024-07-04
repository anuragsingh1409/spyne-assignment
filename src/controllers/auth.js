const User = require("../models/User");
const bcrypt = require("bcrypt");
const { generateAccessToken } = require("../middlewares/auth");

const PASSWORD_REGEX = /^(?=.*\d)(?=.*[!@#$%^&*-?])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
const SALT_ROUNDS = 10;

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res
        .status(401)
        .json(createResponse(false, "Unauthorized access!"));
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json(createResponse(false, "Invalid credentials."));
    }

    const accessToken = generateAccessToken(user);

    return res
      .status(200)
      .json(createResponse(true, "Logged in successfully. Save the token for access to your account.", accessToken));
  } catch (error) {
    console.error(`Error: ${error}`);
    return res
      .status(500)
      .json(createResponse(false, "Some server error occurred!", null, error));
  }
};


const signupUser = async (req, res) => {
  try {
    const { name, mobileNo, email, password } = req.body;
    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res
        .status(400)
        .json(createResponse(false, "Account ID already exists."));
    }

    if (!PASSWORD_REGEX.test(password)) {
      return res
        .status(400)
        .json(
          createResponse(
            false,
            "Password should have minimum 8 characters and include at least one digit, one uppercase letter, one lowercase letter, and one special character"
          )
        );
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const newUser = new User({
      name,
      mobileNo,
      email: normalizedEmail,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    const accessToken = generateAccessToken(savedUser);

    return res
      .status(201)
      .json(
        createResponse(true, "Successfully registered. Save the token for access to your account.", accessToken)
      );
  } catch (err) {
    console.error(`Error: ${err}`);
    return res
      .status(500)
      .json(createResponse(false, "Some server error occurred!", null, err));
  }
};

module.exports = { loginUser, signupUser };
