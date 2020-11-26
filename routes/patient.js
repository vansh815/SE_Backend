const express = require("express")
const patient_details = require("../models/patient_details") 
const { get_jwt_claims } = require("../shared/jwt_claim")
const router = express.Router()
//const get_jwt_claims = require("../shared/jwt_claim")
// Get all posts
router.post("/details", async (req, res) => {
    try {
        //const claims = get_jwt_claims(req)
        //const email = claims['https://example.com/email']
        const email = req.body['email']
        //req.body['email'] = email
        const payload = req.body
        await patient_details.findOneAndUpdate({email: email}, payload, {upsert:true})
        res.status(200)
        res.send(payload)
    } catch (error) {
       res.status(404)
       res.send({error: "Invalid Request"}) 
       console.log(error)
    }
    
})

module.exports = router
