const express = require("express")
const user_details = require("../models/user_details") 
const { get_jwt_claims } = require("../shared/jwt_claim")
const router = express.Router()
const doctor_details = require("../models/doctor_details") 
const patient_details = require("../models/patient_details") 
const insurance_details = require("../models/insurance_details") 
//const get_jwt_claims = require("../shared/jwt_claim")
// Get all posts
router.get("/details", async (req, res) => {
    try {
        const claims = get_jwt_claims(req)
        const email = claims['https://example.com/email']
        
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
        const final = await user_details.findOneAndUpdate({email: email}, payload, {upsert:true})
        console.log(final)
        // update here 
        if ( req.body.role == "patient"){
            console.log("patient")
            new_payload = {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                street_name: req.body.street_name,
                city: req.body.city,
                zip_code: req.body.zip_code,
                
              }
            const final_new = await patient_details.findOneAndUpdate({email: email}, new_payload, {upsert:true})
            console.log(payload)

        }
        else if(req.body.role =="doctor"){
            new_payload = {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                street_name: req.body.street_name,
                city: req.body.city,
                zip_code: req.body.zip_code,
                speciality : req.body.speciality
                
              }
            const final_new = await doctor_details.findOneAndUpdate({email: email}, payload, {upsert:true})
        }
        else {
            insurance_details.findOneAndUpdate({email: email}, payload, {upsert:true})
        }
        res.status(200)
        res.send(req.body)
    } catch (error) {
       res.status(404)
       res.send({error: "Invalid Request"}) 
       console.log(error)
    }
    
})
module.exports = router
