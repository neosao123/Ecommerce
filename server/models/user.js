const mongoose = require("mongoose");
const { ObjectID } = mongoose.Schema

const userCollection = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        require: true,
        index:true
    },
    role: {
         type: String,
         default: "Subscriber"
    },
    cart: {
        type: Array,
        default:[],
    },
    address: String,
},{timestamps: true}
);



module.exports = mongoose.model('ecom-user', userCollection);