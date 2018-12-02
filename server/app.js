const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const mongoURI = "mongodb://localhost/url-shortner";

require('./models/UrlShorten')

// Map global promice - get rid of warning
mongoose.Promise = global.Promise;
// Connect to mongoose

mongoose.connect(mongoURI, {
    useNewUrlParser: true
}) 
.then(() => console.log('MongoDB Connected..'))
.catch(err => console.log(err));


const app = express();

//Body parser middleware

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json());




//Loadinng routes

const api = require("./routes/urlshorten");

app.use('/api',api);



const PORT = 7000; 
app.listen(PORT, () => { 
  console.log(`Server started on port`, PORT); 
});
