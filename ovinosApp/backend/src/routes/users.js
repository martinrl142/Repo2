const { Router } = require('express');
const router = Router();
const passport = require('passport');


const { getUsers, createUser, getUser, deleteUser, updateUser } = require('../controllers/users.controller');

router.route('/').get(getUsers)
router.route('/').post(passport.authenticate(createUser, {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
  }));

router.route('/:id')
    .get(getUser)
    .delete(deleteUser)
    .put(updateUser);

function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    
    res.redirect('/')
    }
    
module.exports = router;
