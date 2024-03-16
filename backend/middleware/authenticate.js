const jwt = require("jsonwebtoken");
const User =  require("../model/userSchema");



const Authenticate =  async(req,res,next) => {
    try {
        const token = await req.cookies.jwtTokenBablu;
        const verifyToken  = jwt.verify(token, process.env.SECRET_KEY);

        console.log("verifyToken");
        console.log(verifyToken);   

        const rootUser = await User.findOne({_id: verifyToken._id, "tokens.token":token})


        console.log("rootUser");
        console.log(rootUser);   

        if(!rootUser){
            console.log("user not found from authentication")
            throw new Error("user not found");
        }
        req.token= token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        next();
        
    } catch (error) {
        console.log("out of the try method")
        res.status(401).send("unauthorized: no token provided");
        console.log(error)
    }



}

module.exports = Authenticate;