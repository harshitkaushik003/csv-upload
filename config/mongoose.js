const mongoose = require('mongoose');

//connecting mongoose
mongoose.connect('mongodb://localhost/csv_db');

//creating connection instance
const db = mongoose.connection;

//handling errors in connection
db.on('error', function(err){
    console.log("Error in connecting to the db");
})

//printing success message
db.once('open', function(){
    console.log("Successfully connected to the db");
})

module.exports = db;