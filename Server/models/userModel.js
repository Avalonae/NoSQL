const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userSchema = new Schema(
    {
        firstname: {type: String},
        lastname: {type: String},
        username: {type: String},
        email: {type: String},
        password: {type: String},
        //albums_borrowed: [{type: String}]
    }
);


const userCollection = mongoose.model("users", userSchema);

module.exports = userCollection;