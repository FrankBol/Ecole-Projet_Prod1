// Les modules Express, Layouts
const express = require("express");
const expressLayouts = require('express-ejs-layouts');

// Variables Environment
const pathPublic = "public";
const dotenv = require('dotenv');
dotenv.config({path:'./configuration.env'}); // process.env
const PORT = process.env.PORT || 3000; // si undefined alors 3000

// Application Express
let app = new express();

// Écouter sur le port
app.listen(PORT, () => {
    console.log(`Server is up and running on PORT ${PORT}.`);
});

// Middleware : Layouts express-ejs-layouts
app.use(expressLayouts);
// Le moteur des layouts
app.set('layout','../views/layouts/applayout');

// Le moteur des views est EJS.
app.set("view engine","ejs");

// Les paramètres seront dans request au lieu de la methode POST
app.use(express.urlencoded({extended : false}));
  
// Chemin "/public" 
app.use(express.static("public"));

// Logger
const morgan = require('morgan');
app.use(morgan('tiny'));

const controllers = require("./controllers/controllerRoute");

app.get('/signup', controllers.getSignup);
app.get('/profil', controllers.getProfil);
app.get('/', controllers.getLogin);
app.get("/deconnexion", controllers.getDeconnexion);

app.post("/signupSubmit", controllers.postSignup);
app.post("/postlogin", controllers.postLogin);

// Idée : Ajouter page 404 si URL invalide - sinon, laisser aller à page login par défaut
// Page par défaut
/*app.get('*', controllers.getLogin);*/
app.get('*', controllers.getError);
app.get('*', controllers.getErrorCreat);


