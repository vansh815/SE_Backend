const mongoose = require("mongoose")

const schema = mongoose.Schema({
    // _id: new mongoose.Types.ObjectId,
    first_name: String,
    last_name: String,
    user_email: String,
	insurance: String,
    street_name: String,
    city: String,
    state_name: String,
    zip_code: Number,
    phone: Number  // where will phone number be used??
})
module.exports = mongoose.model("patient_details", schema)
