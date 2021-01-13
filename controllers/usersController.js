const db = require('../models');
const router = require('express').Router();
const isAuthenticated = require('../utils/middleware').isAuthenticated;

/**
 * User Read - All
 */
router.get('/', isAuthenticated, function(req, res) {
    db.User.find(req.query)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
});

/**
 * User Read - One
 */
router.get('/:id', isAuthenticated, function(req, res) {
    db.User.findById(req.params.id)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
});

/**
 * User - Create
 * Notice how we are using the 'withPassword' scope.
 * This allows for us to modify a user's password, as defined in the User model
 */
router.post('/', isAuthenticated, function(req, res) {
    db.User.create(req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
});

/**
 * User - Update
 */
router.put('/:id', isAuthenticated, function(req, res) {
    db.User.findByIdAndUpdate(req.params.id, req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
});

/**
 * User - Delete
 */
router.delete('/:id', isAuthenticated, function(req, res) {
    db.User.findByIdAndDelete(req.params.id)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
});

module.exports = router;
