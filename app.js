const express = require('express');
const contactRoutes = require('./routes/contactRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());

app.use(contactRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
