const express = require('express');
const bodyParser = require('body-parser'); // Correct the typo here
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
const config = require('./DB');
const route = require('./view/route');

// Use CORS middleware
app.use(cors());

// Use body-parser middleware to parse JSON and urlencoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define your routes
app.use('/', route);

// Set up mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect(config.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Database connected');
}).catch((err) => {
    console.log('Cannot connect to database:', err);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

module.exports = app;
