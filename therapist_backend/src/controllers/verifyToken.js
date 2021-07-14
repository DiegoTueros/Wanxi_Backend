const jwt = require('jsonwebtoken');
const config = require('../config')

async function verifyToken(req, res, next){
    const token = req.headers['x-acces-token'];
    if(!token){
        return res.satus(401).send({auth: false, message: 'no token provider'})
    }

    const decoded = await jwt.verify(token, config.secret);
    req.userId = decode.id;

    next();
}

module.exports =  verifyToken;


