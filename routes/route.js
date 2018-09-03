const express = require('express');
const router = express.Router();

const Contact = require('../models/contacts');

// Retrieving data
router.get('/contacts', (req, res, next) => {
    Contact.find((err, contacts) => {
        res.json(contacts);
    });
});

// Add contact
router.post('/contact', (req, res, next) => {
    let newContact = new Contact ({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone
    });

    newContact.save((err, contact) => {
        if(err)
            res.json({ msg: 'Failed to add contact' });
        else
            res.json({ msg: 'Contact added successfuly' });
    });

});

// Delete contact
router.delete('/contact/:id', (req, res, next) => {
    Contact.remove({ _id: req.params.id}, (err, result));
    if(err)
        res.json(err);
    else
        res.json(result);
});

module.exports = router;