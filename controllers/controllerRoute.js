const axios = require("axios");
const SkiApi = "https://ski-api.herokuapp.com";

exports.getSignup = (req, res) => {
    res.render('signup', {loginFailed : undefined});
};

exports.getLogin = (req, res) => {
    res.render('login', {loginFailed : undefined});
};

exports.getProfil = (req, res) => {
        if(res.app.locals.apiKey){           
            let token = res.app.locals.apiKey;

            axios.get(SkiApi+"/tokenInfo", {headers: {"Authorization": token}})

            .then(resultat =>{
                let data = resultat.data;
                res.render('profil', {name : data.name  , email : data.email});

            })
            .catch(erreur => {res.render("login");});

        }else{res.render("login", );}
};

exports.postSignup = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let name = req.body.name;

    axios.post(SkiApi+"/signup", 
        {
            "email": email,
            "password": password,
            "name" : name
        }
    )
    .then(resultat => {res.render('login',{loginFailed : undefined});})

    .catch(erreur => {res.render('signup',{loginFailed : "Erreur de création de compte existant"});});
};

exports.postLogin = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    axios.post(SkiApi+"/login", 
        {
            "email": email,
            "password": password,
        })
    .then(resultat => {
        let data = resultat.data;
        res.app.locals.apiKey = data.token;

        res.render('profil', {name : data.name, email : data.email});
    })
    .catch(erreur => {res.render("login" ,{loginFailed : "Mauvais mot de passe ou login"});});
};

exports.getDeconnexion = (req, res) => {
    res.app.locals.apiKey = "";
    res.render('login');  
};

exports.error404 = (req, res) => {
    res.render("error404");
}