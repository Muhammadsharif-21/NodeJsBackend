import jwt from 'jsonwebtoken'


function authMidWare (req, res, next) {
    const token = req.headers['authorization']

    if (!token) {return res.status(401).json({messgae: "No token provided"})}

    jwt.verify(token, process.env.JWT_SECRET_KEY,
        (err, decoded) => {
            if (err) {return res.status(401).json({message: "Invalid token!"})}
            req.userId = decoded.id 
            next()
        }
    )
}


export default authMidWare
