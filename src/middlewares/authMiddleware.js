const jwt = require("jsonwebtoken");
require("dotenv").config();

class AuthMiddleware {
  async validateToken(req, res, next) {
    try {
      const token = req.cookies.token;

      if (!token) {
        return res.status(401).send({ error: "Token is required" });
      }

      const secretKey = process.env.SECRET_KEY;
      if (!secretKey) {
        throw new Error("Secret key is not defined");
      }

      const decoded = jwt.verify(token, secretKey);
      req.userId = decoded.id;

      next();
    } catch (e) {
      console.error("Token validation error:", e.message);
      res.status(401).send({ error: e.message });
    }
  }
}

module.exports = new AuthMiddleware();
