const express = require("express")
const doctor_details = require("../models/doctor_details") 
const router = express.Router()
const { get_jwt_claims } = require("../shared/jwt_claim")
// Get all posts
router.post("/details", async (req, res) => {
    try {
        const claims = get_jwt_claims(req)
        const email = claims['https://example.com/email']
        req.body['email'] = email
        const payload = req.body
        await doctor_details.findOneAndUpdate({email: email}, payload, {upsert:true})
        
        res.status(200)
        res.send(req.body)
    } catch (error) {
       res.status(404)
       res.send({error: "Invalid Request"}) 
       console.log(error)
    }
    
})

router.get('/details', async (req, res) => {
    try {
        
        const filter = {
            $or:[
                {first_name: req.query.first_name},
                {last_name: req.query.last_name},
                {city: req.query.city},
                {speciality: req.query.speciality}
            ]
        }
        const result = await doctor_details.find(filter).exec()
        res.status(200)
        res.send(result)

    }catch(error){
        res.status(404)
        res.send({error: "Server Error"}) 
    }
})
  

module.exports = router
