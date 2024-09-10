const db = require('../config/db');
const freshSalesService = require('../services/freshSalesService');

// Create Contact
const createContact = async (req, res) => {
    const { first_name, last_name, email, mobile_number, data_store } = req.body;
    try {
        if (data_store === 'CRM') {
            const response = await freshSalesService.createContact({ first_name, last_name, email, mobile_number });
            return res.json(response.data);
        } else if (data_store === 'DATABASE') {
            const query = 'INSERT INTO contacts (first_name, last_name, email, mobile_number) VALUES (?, ?, ?, ?)';
            db.query(query, [first_name, last_name, email, mobile_number], (err, results) => {
                if (err) throw err;
                return res.json({ id: results.insertId });
            });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Contact
const getContact = async (req, res) => {
    const { contact_id, data_store } = req.body;
    try {
        if (data_store === 'CRM') {
            const response = await freshSalesService.getContact(contact_id);
            return res.json(response.data);
        } else if (data_store === 'DATABASE') {
            const query = 'SELECT * FROM contacts WHERE id = ?';
            db.query(query, [contact_id], (err, results) => {
                if (err) throw err;
                return res.json(results[0]);
            });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update Contact
const updateContact = async (req, res) => {
    const { contact_id, new_email, new_mobile_number, data_store } = req.body;
    try {
        if (data_store === 'CRM') {
            const response = await freshSalesService.updateContact(contact_id, new_email, new_mobile_number);
            return res.json(response.data);
        } else if (data_store === 'DATABASE') {
            const query = 'UPDATE contacts SET email = ?, mobile_number = ? WHERE id = ?';
            db.query(query, [new_email, new_mobile_number, contact_id], (err, results) => {
                if (err) throw err;
                return res.json({ message: 'Contact updated successfully' });
            });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete Contact
const deleteContact = async (req, res) => {
    const { contact_id, data_store } = req.body;
    try {
        if (data_store === 'CRM') {
            const response = await freshSalesService.deleteContact(contact_id);
            return res.json(response.data);
        } else if (data_store === 'DATABASE') {
            const query = 'DELETE FROM contacts WHERE id = ?';
            db.query(query, [contact_id], (err, results) => {
                if (err) throw err;
                return res.json({ message: 'Contact deleted successfully' });
            });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createContact,
    getContact,
    updateContact,
    deleteContact,
};
