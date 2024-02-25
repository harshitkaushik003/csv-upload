//requiring express
const express = require('express');

//setting up port
const port = 8000; 

//requiring express layouts
const expressLayouts = require('express-ejs-layouts');

//requiring mongodb instance
const db = require('./config/mongoose');

//setting up the app
const app = express();

//settings related to the view engines
app.set('view engine', 'ejs');
app.set('views', "./views");
app.use(express.static('./assets'));
app.use(expressLayouts);
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//setting up the routes
app.use('/', require('./routes'));

// firing up the server
app.listen(port, function(error){
    if(error){
        console.log("Error while firing up the server -> ", error);
        return;
    }
    console.log(`Server is running on port -> ${port}`);
})

