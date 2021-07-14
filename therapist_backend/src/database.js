const mongoose = require('mongoose')



async function connect(){
    await mongoose.connect('mongodb://localhost/wanxi_database', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }).then(db => console.log('Database: Connected'));
};


module.exports = { connect };