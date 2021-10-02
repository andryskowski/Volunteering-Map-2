const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
//Import Routes
const authRoute = require('./routes/auth');
const placesRoute = require('./routes/places');
const usersRoute = require('./routes/users');
const bodyParser = require('body-parser');
var cors = require('cors');
app.use(bodyParser.json());

dotenv.config();
app.use(cors({
    origin: '*'
}));
app.use('/places', placesRoute);
app.use('/users', usersRoute);

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
