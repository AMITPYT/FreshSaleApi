const axios = require('axios');
require('dotenv').config();

// FreshSales API setup
const freshSalesAPI = axios.create({
    baseURL: `https://${process.env.FRESHSALES_DOMAIN}/api`,
    headers: {
        'Authorization': `Token token=${process.env.FRESHSALES_API_KEY}`,
        'Content-Type': 'application/json',
    }
});

const createContact = async (contact) => {
    return await freshSalesAPI.post('/contacts', { contact });
};

const getContact = async (contact_id) => {
    return await freshSalesAPI.get(`/contacts/${contact_id}`);
};

const updateContact = async (contact_id, new_email, new_mobile_number) => {
    return await freshSalesAPI.put(`/contacts/${contact_id}`, {
        contact: { email: new_email, mobile_number: new_mobile_number }
    });
};

const deleteContact = async (contact_id) => {
    return await freshSalesAPI.delete(`/contacts/${contact_id}`);
};

module.exports = {
    createContact,
    getContact,
    updateContact,
    deleteContact,
};
