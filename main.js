
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

// Les paramètres seront dans request au lieu de la methode POST
app.use(express.urlencoded({extended : false}));
  
// Chemin "/public" 
app.use(express.static("public"));

const controllers = require("./controllers/controllerRoute");

app.get('/signup', controllers.getSignup);
app.get('/login', controllers.getLogin);
app.get('/profil', controllers.getLogin);
app.get('/', controllers.index);


app.post("/signup", controllers.postSignup);

app.post("/login", controllers.postLogin);

// status de l'API
app.get("/API/status", controllers.getStatusAPI);

// exemple de login de l'API
app.get("/API/login", controllers.getLoginAPI);


