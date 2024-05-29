const jwt = require('jsonwebtoken')

function verifyToken(req, res, next) {
    const authToken = req.headers.authorization;
    if (authToken) {
        const token = authToken;
        try {
            const decodedPayload = jwt.verify(token, process.env.SECRET_KEY)
            req.user = decodedPayload
            next()
        } catch (error) {
            return res.json({ message: "Invalid Token, Access Denied" })
        }
    }
    else {
        res.json({ message: "No Token Provide" })
    }
}

function verifyTokenAndAdmin(req, res, next) {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next()
        }
        else {
            return res.json({ message: "Not Allowed, Only Admin" })
        }
    })
}

function verifyTokenAndOnlyUser(req, res, next) {
    verifyToken(req,res, ()=>{
        if (req.user.id === req.params.id || req.user.isAdmin === true) {
            next()
        }
        else{
            return res.json({message:"Not Allowed, Only User"})
        }
    })
}

module.exports = {
    verifyToken,
    verifyTokenAndAdmin,
    verifyTokenAndOnlyUser,
}