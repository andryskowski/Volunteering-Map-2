const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
//Import Routes
const authRoute = require('./routes/auth');
var cors = require('cors');

dotenv.config();
app.use(cors())

//Connect to DB
mongoose.connect(
    process.env.DB_CONNECT,
{ useNewUrlParser: true },
() => console.log('connected to db')
);

//Middleware
app.use(express.json());
//Route Middlewares
app.use('/api/user', authRoute);

app.listen(8000, () => console.log('Server Up and running'));
