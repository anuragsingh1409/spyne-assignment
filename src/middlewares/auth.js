const jwt = require("jsonwebtoken");

const jwtTokenSecretAccess = process.env.TOKEN_SECRET_KEY;

const JWTMiddleware = async (req, res, next) => {
  const accessToken = req.headers.accesstoken;

  if (!accessToken) {
    return res
      .status(401)
      .json(createResponse(false, "No token found in 'Authorization' header."));
  }

  try {
    const decryptedToken = jwt.verify(accessToken, jwtTokenSecretAccess);

    if (decryptedToken) {
      req.user = decryptedToken;
      return next();
    } else {
      return res
        .status(401)
        .json(createResponse(false, "Invalid token used!"));
    }
  } catch (err) {
    if (err.message === "invalid signature") {
      return res
        .status(403)
        .json(createResponse(false, "Do not attempt to use a different token!"));
    }
    return res
      .status(401)
      .json(createResponse(false, "Invalid token used!"));
  }
};

const JWTEncryptAccess = (user) => {
  return jwt.sign({ _id: user._id }, jwtTokenSecretAccess);
};

module.exports = { JWTMiddleware, JWTEncryptAccess };
