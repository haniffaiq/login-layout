const mongoose  = require('mongoose')

mongoose.connect("mongodb://localhost:27017/userDb");

var mongoSchema = mongoose.Schema;

var userSchema = {
    "userEmail" : String,
    "userPassword" : String
}

module.exports = mongoose.model("userLogin", userSchema)