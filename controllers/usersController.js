const db = require('../models');
const router = require('express').Router();
const isAuthenticated = require('../utils/middleware').isAuthenticated;

router.get('/', isAuthenticated, function(req, res) {
    db.User.find(req.query)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
});

router.get('/:id', isAuthenticated, function(req, res) {
    db.User.findById(req.params.id)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
});

router.post('/', isAuthenticated, function(req, res) {
    db.User.create(req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
});

router.put('/:id', isAuthenticated, function(req, res) {
    db.User.findByIdAndUpdate(req.params.id, req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
});

router.delete('/:id', isAuthenticated, function(req, res) {
    db.User.findByIdAndDelete(req.params.id)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
});

module.exports = router;
