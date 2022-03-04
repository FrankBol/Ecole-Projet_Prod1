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

// Les paramètres seront dans request au lieu de la methode POST
app.use(express.urlencoded({extended : false}));

// Chemin "/public" pour le contenu static dont HTML, CSS, JS, JPG, GIF, PNG.
app.use(express.static(pathPublic, {extensions: ['html','htm','css','js','jpg','gif','png']}));

app.get('/signup', (request, response) => {
    response.render('signup');
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

app.post('/signup', (request, response) => {
    let email = request.body.email;
    let password = request.body.password;
    let name = request.body.name;
    axios.post(SkiApi+"/login", 
        {
            "email": email,
            "password": password
        }
    )
    .then(resultat => {
        response.render('profil',resultat.data);
    })
    .catch(erreur => {
        response.send('erreur :' + erreur);
    });
    // {"_id":"6221692368a0c30004062a7f","address":"","phone":"","name":"Amy Bienvenu","email":"amy.bienvenu@outlook.com","password":"$2a$08$cOz0xeNg033rpkn7UweM2e4kcLhuI/BMkmLRoVT/PRNIKU6D18L0e","__v":0}    
});
app.post('/login', (request, response) => {
    let email = request.body.email;
    let password = request.body.password;
    axios.post(SkiApi+"/login", 
        {
            "email": email,
            "password": password
        }
    )
    .then(resultat => {
        response.render('profil',resultat.data);
        // response.send(resultat.data);
    })
    .catch(erreur => {
        response.send('erreur :' + erreur);
    });
    // {"address":"","phone":"","_id":"6221692368a0c30004062a7f","name":"Amy Bienvenu","email":"amy.bienvenu@outlook.com","password":"$2a$08$cOz0xeNg033rpkn7UweM2e4kcLhuI/BMkmLRoVT/PRNIKU6D18L0e","__v":0,"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI2MjIxNjkyMzY4YTBjMzAwMDQwNjJhN2YiLCJleHAiOjE2NDY0NDMyMzc2MDZ9.uolOMqUnwtVXrykLvDcHw8_UEU5VECQ8tr1b_XFiAhA"}    
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
