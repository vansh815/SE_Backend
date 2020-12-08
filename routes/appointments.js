const express = require("express")
const user_details = require("../models/user_details") 
const router = express.Router()
const { get_jwt_claims } = require("../shared/jwt_claim")

router.get('/details', async (req, res) => {
    try {
        console.log('going inside')
        const claims = get_jwt_claims(req)
        const email = claims['https://example.com/email']
        const filter = {
           email: email
        }
        const result = await user_details.find(filter).exec()
        res.status(200)
        return res.send(result)

    }catch(error){
        res.status(404)
        res.send({error: "Server Error"}) 
    }
})
  

module.exports = router
