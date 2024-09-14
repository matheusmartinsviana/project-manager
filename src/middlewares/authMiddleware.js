const jwt = require("jsonwebtoken");
require("dotenv").config();

class AuthMiddleware {
  async validateToken(req, res, next) {
    try {
      const token = req.cookies.token;

      if (!token) {
        return res.status(401).send({ error: "Token is required" });
      }

      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.userId = decoded.id;

      next();
    } catch (e) {
      res.status(401).send({ error: e.message });
    }
  }
}

module.exports = new AuthMiddleware();
