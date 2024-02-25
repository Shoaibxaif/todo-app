const express = require( 'express' );

const PORT = 8000;

const app =  express();

//view engine

app.set("view engine", "ejs");

//static files

app.use( express.static('public') ) ;

// listen server

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});