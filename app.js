// Importing modules
const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');
const path = require('path');

var app = express();

const route = require('./routes/route');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/contactlist')

// On connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database mongodb @ 21017');
});

mongoose.connection.on('error', (err) => {
    if(err)
        console.log('Error in Database connection: ', err);
});

// Port no
const port = 3000;

// Adding Middleware - cors
app.use(cors());

// Adding Middleware - bodyparser
app.use(bodyparser.json());

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', route);

// Testing server
app.get('/', (req, res) => {
    res.send('This is a simple contact list');
});

app.listen(port, () => {
    console.log('Server started at port: ' + port)
});
