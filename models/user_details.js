const mongoose = require("mongoose")

const schema = mongoose.Schema({
    // _id: new mongoose.Types.ObjectId,
    first_name: String,
    last_name: String,
    email: String,
    street_name: String,
    city: String,
    apartment: String,
    zip_code: Number,
    phone: Number,
    role : String
})
module.exports = mongoose.model("user_details", schema)