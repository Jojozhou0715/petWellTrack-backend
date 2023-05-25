const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET

const decodeUserFromToken = (req, res, next) => {
    let token = req.get('Authorization') || req.querry.token || req.body.token
    if (token) {
        token = token.replace('Bearer ', '')
        jwt.verify(token, SECRET, (err, decoded) => {
            if (err) {
                next(err)
            }else{
                req.user = decoded.user
                next()
            }
            
        })
    } else{
        next()
    }
}

function checkAuth(req, res, next) {
    return req.user ? next() : res.status(401).json({ nsg: 'Not Authorized'})
}

module.exports = { decodeUserFromToken, checkAuth };
