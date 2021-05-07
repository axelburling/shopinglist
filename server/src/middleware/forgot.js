const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  const token = req.header("forgot");

  if (!token) {
    return res.status(403);
  }

  try {
    const verify = jwt.verify(token, process.env.forgotSECRET);

    req.user = verify.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token invalid" });
  }
};
