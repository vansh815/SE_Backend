const express = require('express');
const app = express();
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');
const cors = require('cors');
// now on

require('dotenv').config();

if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_AUDIENCE) {
  throw 'Make sure you have AUTH0_DOMAIN, and AUTH0_AUDIENCE in your .env file';
}

const corsOptions =  {

  origin: 'http://localhost:3000'
  };

  //origin: 'https://health-insurance123.herokuapp.com'

app.use(cors(corsOptions));
app.use(express.json())
const checkJwt = jwt({
  // Dynamically provide a signing key based on the [Key ID](https://tools.ietf.org/html/rfc7515#section-4.1.4) header parameter ("kid") and the signing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json/`
  }),

  // Validate the audience and the issuer.
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256']
});

const checkScopes = jwtAuthz(['read:messages']);

app.get('/api/public', function(req, res) {
  res.json({
    message: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'
  });
});

app.get('/api/private', checkJwt, function(req, res) {
  res.json({
    message: 'Hello from a private endpoint! You need to be authenticated to see this.'
  });
});

app.get('/api/private-scoped', checkJwt, checkScopes, function(req, res) {
  res.json({
    message: 'Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.'
  });
});

// app.use(function(err, req, res, next){
//   console.log(req.headers)
//   console.error(err.stack);
//   return res.status(err.status).json({ message: err.message });
// });


const uri = "mongodb+srv://hims:smih@cluster0.a9dob.mongodb.net/HIMS?retryWrites=true&w=majority";

const mongoose = require("mongoose") // new

// Connect to MongoDB database
mongoose
	.connect(uri, { useNewUrlParser: true })
	.then(() => {
    console.log("Connected to Database")

  })
const user_router = require('./routes/user')
const patient_router = require("./routes/patient")
const doctor_router = require("./routes/doctor")
const insurance_router = require("./routes/insurance")
const booking_router = require("./routes/booking")
const appointment_router = require("./routes/appointments")

app.use('/appointments', checkJwt, appointment_router)
app.use('/booking', checkJwt, booking_router)
app.use("/patient",checkJwt, patient_router)
app.use("/doctor",checkJwt, doctor_router)
app.use("/insurance",checkJwt, insurance_router)
app.use('/user', checkJwt, user_router)


app.listen(3010);
console.log('Listening on http://localhost:3010');


