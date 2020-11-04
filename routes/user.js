const express = require("express")
const user_details = require("../models/user_details") 
const { get_jwt_claims } = require("../shared/jwt_claim")
const router = express.Router()
//const get_jwt_claims = require("../shared/jwt_claim")
// Get all posts
router.get("/details", async (req, res) => {
    try {
        const claims = get_jwt_claims(req)
        const email = claims['https://example.com/email']
        req.body['email'] = email
        const filter = {email : email}
        console.log(filter)
        const result = await user_details.exists(filter)
        console.log(result)
        res.status(200)
        res.send(result) 
    } catch (error) {
       res.status(404)
       res.send({error: "Invalid Request"}) 
       console.log(error)
    }
    
})
router.post("/details", async (req, res) => {
    try {
        console.log("In details")
        const claims = get_jwt_claims(req)
        const email = claims['https://example.com/email']
        
        //const email = req.body['email']
        //req.body['email'] = email
        console.log(req.body)
        const payload = req.body
        await user_details.findOneAndUpdate({email: email}, payload, {upsert:true})
        res.status(200)
        res.send(req.body)
    } catch (error) {
       res.status(404)
       res.send({error: "Invalid Request"}) 
       console.log(error)
    }
    
})
module.exports = router
