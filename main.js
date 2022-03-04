// Modules
const axios = require("axios");
const express = require("express");
// Variables Environment
const pathPublic = "public";
const PORT = 3000;

// Application Express
let app = new express();

// Écouter sur le port
app.listen(PORT, () => {
    console.log(`Server is up and running on PORT ${PORT}.`);
});

// Le moteur des views est EJS.
app.set("view engine","ejs");

// Chemin "/public" 
app.use(express.static("public"));

const controllers = require("./controllers/controllerRoute");

app.get('/signup', controllers.signup);
app.get('/login', controllers.login);
app.get('/profil', controllers.profil);
app.get('/', controllers.index);

// status de l'API
app.get("/API/status", controllers.apiStatus);

// exemple de login de l'API
app.get("/API/login", controllers.apiLogin);

// login de l'API
app.post("/API/login", controllers.apiLoginPost);
