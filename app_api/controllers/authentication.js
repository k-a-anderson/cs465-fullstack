const mongoose = require('mongoose');
const User = require('../models/user');
const passport = require('passport');

const register = async (req, res) => {
    // Validate message to insure that all paramenters are present
    if (!req.body.email || !req.body.name || !req.body.password) {
        return res
        .status(400)
        .json({ message: 'All fields required' });
    }

    const user = new User(
        {
            name: req.body.name,
            email: req.body.email,
            password: ''
        });
    user.setPassword(req.body.password);
    const q = await user.save();

    if (!q) {
        return res
        .status(400)
        .json(err);
    } else {
        const token = user.generateJwt();
        return res
        .status(200)
        .json(token);
    }
        
};

const login = async (req, res) => {
    // validate message to insure that all paramenters are present
    if (!req.body.email || !req.body.password) {
        return res
        .status(400)
        .json({ message: 'All fields required' });
    }

    // Delegate authentication to passport
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            // Error in authentication process
            return res
            .status(400)
            .json(err);
        }
        if (user) {
            // If authentication is successful, generate a JWT and return it
            const token = user.generateJwt();
            res
            .status(200)
            .json({ token });
        } 
        // If authentication fails, return the info message from passport
        return res   
        .status(401)
        .json(info);
    })(req, res);
};

module.exports = {
    register,
    login
};
