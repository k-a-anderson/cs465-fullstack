const express = require("express"); //Express ap
const router = express.Router(); //Router logic
const jwt = require('jsonwebtoken'); // JWT for token generation

// This is where we import the controllers we will route
const tripsController = require("../controllers/trips");
const authController = require("../controllers/authentication");

router.route('/register').post(authController.register);
router.route('/login').post(authController.login);

//define route for our trips endpoint
router
    .route('/trips')
    .get(tripsController.tripsList) // GET method routes triplist
    .post(authenticateJWT, tripsController.tripsAddTrip); // POST method adds a trip

//Get Method routes tripsFindByCode - requires parameter
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(authenticateJWT, tripsController.tripsUpdateTrip);

// Define route for login endpoint
router
    .route('/login')
    .post(authController.login);
    
// Method to authenticate JWT tokens for protected routes
function authenticateJWT(req, res, next) {
    //console.log ('In Middleware');
    const authHeader = req.headers['authorization'];
    //console.log('Auth Header: ' + authHeader);

    if (authHeader == null) {
        console.log('Auth Header required but not found');
        return res.sendStatus(401); // Unauthorized
    }

    let headers = authHeader.split(' ');
    if (headers.length < 1) {
        console.log('Not enough tokens in auth header' + headers.length);
        return res.sendStatus(501); // Invalid token format
    }

    const token = authHeader.split(' ')[1];
    if (token == null) {
        console.log('Null Bearer Token');
        return res.sendStatus(401); // Unauthorized
    }

    //console.log(process.env.JWT_SECRET);
    // console.log(jwt.decode(token));
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.sendStatus(401).json({ message: 'Invalid token' });
        }
        req.auth = decoded; // Set the auth param to the decoded object
    });
    next(); // Need to continue or it will hang forever
}

module.exports = router;