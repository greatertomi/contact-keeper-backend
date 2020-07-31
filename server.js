const express = require('express');
const connectDB = require('./config/db');

const app = express();
connectDB();

// Used to parse json request. You would formerly use body-parser for this.
app.use(express.json({ extended: false }));

app.use('/api/v1/users', require('./routes/users'));
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/contacts', require('./routes/contacts'));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
