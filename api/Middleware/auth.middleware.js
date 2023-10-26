import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    if (req.headers.cookies) {
      let token = req.headers.cookies;
      let decodeToken = jwt.verify(token, "token");
      if (decodeToken) {
        next();
      } else {
        return res.status(401).json({
          Message: "Invalid Token",
        });
      }
    } else {
      return res.status(500).json({
        Message: "Invalid DecodeToken",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export default auth;
