const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.use(require('./controllers/authentication'))


//app.use(require('./routes/therapist'))


const morgan = require('morgan')
//const cors = require('cors')

app.use(morgan('dev'));
//app.use(cors);
module.exports = app