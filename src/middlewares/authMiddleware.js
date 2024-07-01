const jwt = require('jsonwebtoken');

const SECRET_KEY = 'c209e4660e965332f0c7424aa357079b597726d83a0ee935c2f609d74fc957b2';

class AuthMiddleware {
    async validateToken(req, res, next) {
        try {
            const token = req.headers.authorization;

            if (!token) {
                return res.status(401).send({ error: 'Token is required' });
            }

            await jwt.verify(token, SECRET_KEY)
            next();
        } catch (e) {
            res.status(400).send({ error: e.message });
        }
    }
}

module.exports = new AuthMiddleware();
