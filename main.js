const express = require("express");
const app = new express();
const expressLayouts = require('express-ejs-layouts');
const morgan = require('morgan');
const controllers = require("./controllers/controllerRoute");

const dotenv = require('dotenv');
dotenv.config({path:'./configuration.env'}); 


app.use(expressLayouts);
app.use(express.urlencoded({extended : true}));
app.use(express.static("public"));
app.use(morgan('tiny'));

app.set('layout','../views/layouts/applayout');
app.set("view engine","ejs");

const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
    console.log(`Server is up and running on PORT ${PORT}.`);
});


app.get('/signup', controllers.getSignup);
app.get('/profil', controllers.getProfil);
app.get('/', controllers.getLogin);
app.get("/deconnexion", controllers.getDeconnexion);

app.post("/signupSubmit", controllers.postSignup);
app.post("/postlogin", controllers.postLogin);



