const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(" ")[1];
        req.token = bearerToken;

        jwt.verify(req.token, 'secretkey', (err, payload) => {
            if (err) return res.sendStatus(401);
            req.body.user = payload;
            next();
        })
    } else {
        errorResponse(res, {
            message: "Not authorized"
        });
    }
}

function errorResponse(res, error) {
    res.status(401).send({
        error: {
            code: 401,
            message: error.message,
            date: new Date()
        }
    });
}
