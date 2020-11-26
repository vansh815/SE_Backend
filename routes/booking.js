const express = require("express")
const doctor_details = require("../models/doctor_details") 
const patient_details = require("../models/patient_details") 
const router = express.Router()
const { get_jwt_claims } = require("../shared/jwt_claim")
// Get all posts
router.post("/details", async (req, res) => {
    try {
        console.log("here")
        const claims = get_jwt_claims(req)
        const email_patient = claims['https://example.com/email']
        console.log(req.body)
        
        
        
        await doctor_details.update({email:req.body['doctor_email'] }, {$push : {appointments: req.body['appointments']} })
        console.log("doctor done")
        await patient_details.update({email: email_patient}, {$push : {appointments: req.body['appointments']} })
        
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
        console.log(req.query)
        const filter = {
            $or:[
                {email: req.query.doctor_email},
            ]
        }
        const result = await doctor_details.find(filter).exec()
        console.log(result)
        res.status(200)
        res.send(result)

    }catch(error){
        res.status(404)
        res.send({error: "Server Error"}) 
    }
})
  

module.exports = router
