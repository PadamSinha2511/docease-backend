const jwt = require('jsonwebtoken')

const secret = "ksjdfnlsnfdsdflksnf;ldf"
function generateToken(user){
    const payload = {
        _id:user.id,
        name:user.name,
        email:user.email,
    }

    const token =  jwt.sign(payload,secret)
    return token
}

function validateToken(token)
{
    const payload = jwt.verify(token,secret)
    return payload
}

module.exports = {
    generateToken,
    validateToken
}