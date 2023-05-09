import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    let responseBody;
    let stat = 400;

    try {
        const token =
            req.body.token || req.query.token || req.headers['x-access-token'];

        if (!token) {
            stat = 401;
            throw 'A token is required for authentication';
        }

        const decode = jwt.verify(token, process.env.USERAUTHTOKENKEY);
        req.user = decode;

        next();
    } catch (err) {
        if (err.toString().startsWith('TokenExpiredError')) {
            stat = 401;
        }
        responseBody = { error: err.toString() };
        res.status(stat).json(responseBody);
    }
};

export default verifyToken;
