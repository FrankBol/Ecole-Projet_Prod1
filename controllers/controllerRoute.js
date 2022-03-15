// Modules
const axios = require("axios");

const SkiApi = "https://ski-api.herokuapp.com";

exports.getSignup = (request, response) => {
    response.render('signup');
};

// TODO : vérifier pour error = undefined
exports.getLogin = (request, response) => {
    response.render('login',{error:undefined});
};

// TODO : vérifier pour name et email = undefined
exports.getProfil = (request, response) => {
    response.render('profil',{name:undefined, email:undefined});
};

exports.index = (request, response) => {
    response.render('index');
};

//---------------cette function ce fait en front-end a rectifiex-------------------------------------
// exports.postLogin = (request, response) => {
//     let email = request.body.email;
//     let password = request.body.password;
//     axios.post(SkiApi+"/login", 
//         {
//             "email": email,
//             "password": password
//         }
//     )
//     .then(resultat => {
//         response.render('profil',resultat.data);
//         // response.send(resultat.data);
//     })
//     .catch(erreur => {
//         response.render('login', {error:"Erreur de login"});
//         // response.send('erreur :' + erreur);
//     });
//     // {"address":"","phone":"","_id":"6221692368a0c30004062a7f","name":"Amy Bienvenu","email":"amy.bienvenu@outlook.com","password":"$2a$08$cOz0xeNg033rpkn7UweM2e4kcLhuI/BMkmLRoVT/PRNIKU6D18L0e","__v":0,"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI2MjIxNjkyMzY4YTBjMzAwMDQwNjJhN2YiLCJleHAiOjE2NDY0NDMyMzc2MDZ9.uolOMqUnwtVXrykLvDcHw8_UEU5VECQ8tr1b_XFiAhA"}    
// };

exports.postSignup = (request, response) => {
    let email = request.body.email;
    let password = request.body.password;
    let name = request.body.name;
    axios.post(SkiApi+"/signup", 
        {
            "email": email,
            "password": password,
            "name" : name
        }
    )
    .then(resultat => {
        response.render('login');
    })
    .catch(erreur => {
        response.send('erreur :' + erreur);
    });
    // {"_id":"6221692368a0c30004062a7f","address":"","phone":"","name":"Amy Bienvenu","email":"amy.bienvenu@outlook.com","password":"$2a$08$cOz0xeNg033rpkn7UweM2e4kcLhuI/BMkmLRoVT/PRNIKU6D18L0e","__v":0}    
};

