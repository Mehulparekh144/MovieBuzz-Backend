const jwt = require("jsonwebtoken");
const User = require("../models/User");

const isAuthenticated = (req,res,next) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).send("Unauthorized");
    }
    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
        if (err) {
            return res.status(404).send("Invalid token");
        }
        const user = await User.findById(decoded.id);
        req.user = user;
        next();
    });
}

module.exports =  isAuthenticated;