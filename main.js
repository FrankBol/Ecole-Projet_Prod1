// Modules
const axios = require("axios");
const express = require("express");
// Variables Environment
const pathPublic = "public";
const PORT = 3000;
// APIs
const SkiApi = "https://ski-api.herokuapp.com";

// Application Express
let app = new express();

// Écouter sur le port
app.listen(PORT, () => {
    console.log(`Server is up and running on PORT ${PORT}.`);
});

// Le moteur des views est EJS.
app.set("view engine","ejs");

// Chemin "/public" pour le contenu static dont HTML, CSS, JS, JPG, GIF, PNG.
app.use(express.static(pathPublic, {extensions: ['html','htm','css','js','jpg','gif','png']}));

app.get('/signup', (request, response) => {
    response.render('signup ');
});
app.get('/login', (request, response) => {
    response.render('login');
});
app.get('/profil', (request, response) => {
    response.render('profil');
});
app.get('/', (request, response) => {
    response.sendFile('index.html');
});

// status de l'API
app.get("/API/status", (request, response) => {
    axios.get(SkiApi+"/status")
    .then(resultat => {
        response.send(resultat.data);
    })
    .catch(erreur => {
        response.send('erreur :' + erreur);
    });
});

// exemple de login de l'API
app.get("/API/login", (request, response) => {
    axios.get(SkiApi+"/login")
    .then(resultat => {
        response.send(resultat.data);
    })
    .catch(erreur => {
        response.send('erreur :' + erreur);
    });
});

// login de l'API
app.post("/API/login", (request, response) => {
    axios.post(SkiApi+"/login", 
        {
            "email": "rr",
            "password": "rr"
        }
    )
    .then(resultat => {
        response.send(resultat.data);
    })
    .catch(erreur => {
        response.send('erreur :' + erreur);
    });
});
