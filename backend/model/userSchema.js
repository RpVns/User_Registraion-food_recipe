const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// you exported mongoose here, or backend 
const mongoose = require("mongoose");


// this is the model 
const userSchema = new mongoose.Schema({

    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    phone:{
        type:Number,
        require:true
    },
    work:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    cPassword:{
        type:String,
        require:true
    },
    tokens:[
        {
            token:{
                type:String,
                require:true
            }
        }
    ]
})


// we are hashing the password here
userSchema.pre('save' , async function(next){
    console.log("hi from userSchema")
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 12);
        this.cPassword = await bcrypt.hash(this.cPassword, 12);
    }
    next();
} )

// generateAuthToken is a function
// we are generating token
userSchema.methods.generateAuthToken = async function() {
    try {
        
        let tokenHello = jwt.sign({ _id : this._id }, process.env.SECRET_KEY )
        this.tokens = this.tokens.concat({ token:tokenHello });
        await this.save();

        return tokenHello;

    }catch (err) {
        console.log("error from token")
        console.log(err);
    }
}


// "useras" named database is created in backend in the structure of userSchema 
const User = mongoose.model('USERA',userSchema)
module.exports = User;