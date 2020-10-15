const express = require("express")
const insurance_details = require("../models/insurance_details") 
const router = express.Router()
const { get_jwt_claims } = require("../shared/jwt_claim")
// Get all posts
router.post("/details", async (req, res) => {
    try {
        const claims = get_jwt_claims(req)
        const email = claims['https://example.com/email']
        req.body['email'] = email
        const payload = req.body
        await insurance_details.findOneAndUpdate({email: email}, payload, {upsert:true})
        res.status(200)
        res.send(req.body)
    } catch (error) {
       res.status(404)
       res.send({error: "Invalid Request"}) 
       console.log(error)
    }
    
})

module.exports = router
