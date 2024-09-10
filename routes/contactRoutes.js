const express = require('express');
const contactController = require('../controllers/contactController');
const router = express.Router();

// Create Contact
router.post('/createContact', contactController.createContact);

// Get Contact
router.post('/getContact', contactController.getContact);

// Update Contact
router.post('/updateContact', contactController.updateContact);

// Delete Contact
router.post('/deleteContact', contactController.deleteContact);

module.exports = router;
