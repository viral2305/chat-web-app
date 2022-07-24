const jwt = require("jsonwebtoken");
const {secret_key} = require("../uils/config");

const verifyToken = (req, res, next) => {
    const token =
        req.body.token || req.headers.accesstoken || req.headers["authorization"];

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const decoded = jwt.verify(token, secret_key);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send({msg:"Invalid Token",err:err});
    }
    return next();
};

module.exports = verifyToken;