const express = require('express');
const path = require('path');

// DB Connection
require('./src/database/connection');

// require('./src/bootstrap')();

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commRoutes = require('./routes/comm');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });


app.use('/pics', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comm', commRoutes);

module.exports = app;