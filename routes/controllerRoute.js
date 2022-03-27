const axios = require("axios");
const SkiApi = "https://ski-api.herokuapp.com";

exports.getSignup = (req, res) => {
    res.render('signup', {signupFailed: undefined});
};

exports.getLogin = (req, res) => {
    res.render('login', {loginFailed: undefined});
};

exports.getDeconnexion = (req, res) => {
    res.app.locals.apiKey = "";
    res.render('login', {loginFailed : undefined});  
};

exports.getProfil = (req, res) => {
    if (res.app.locals.apiKey) {
        let token = res.app.locals.apiKey;

        axios.get(SkiApi + "/tokenInfo", {headers: {"Authorization": token}})

            .then(resultat => {
                let data = resultat.data;
                res.render('profil', {name: data.name, email: data.email});

            })
            .catch(erreur => res.render('login', {loginFailed: undefined}));

    } else {res.render("login", {loginFailed: undefined});}
};

exports.postSignup = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let name = req.body.name;

    axios.post(SkiApi + "/signup", 
        {
            "email": email,
            "password": password,
            "name": name
        })
    .then(resultat => {res.render('login',{ loginFailed: undefined});})

    .catch(erreur => {res.render("signup",{ signupFailed : "Erreur de création de compte existant"});});
};

exports.postLogin = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    axios.post(SkiApi + "/login", 
        {
            "email": email,
            "password": password,
        })
        .then(resultat => {
            let data = resultat.data;
            res.app.locals.apiKey = data.token;

            res.render('profil', {name: data.name, email: data.email});
        })
        .catch(erreur => {res.render('login', {loginFailed: "Mauvais mot de passe ou login"});});
};

exports.getSpot = (req, res) => {
    let token = res.app.locals.apiKey;

    axios.get(SkiApi + "/ski-spot", {headers: {"Authorization": token}})
        .then(resultat => {
            spots = resultat.data.skiSpots;

            axios.get(SkiApi + "/tokenInfo", {headers: {"Authorization": token}})
                .then(resultat => {
                    let name = resultat.data.name;

                    res.render('testSpot', { spots, name, deleteFaile : undefined });
                })
        }).catch(erreur => {
            res.render("login", { loginFailed: undefined });
        });
};

exports.getCreateSpot = (req, res) => {
    let token = res.app.locals.apiKey;
    if(token){
        res.render("testCreate", { createFailed : undefined });
    }
    else{res.render("login", { loginFailed : undefined });}
};

exports.postCreateSpot = (req, res) => {
    let token = res.app.locals.apiKey;
    let description = req.body.description;
    let name = req.body.name;
    let address = req.body.address;
    let difficulty = req.body.difficulty;

    let coordinates =  req.body.coordinates;
    let tabCoordinates = coordinates.split(",");
    let numberTabCoordinates = tabCoordinates.map( i => Number(i));

    axios.post(SkiApi + "/ski-spot", {

            "description": description,
            "name": name,
            "address": address,
            "difficulty": difficulty,
            "coordinates": numberTabCoordinates
        }, 

        {headers: {"Authorization": token,}})

        .then(resultat => {
            res.redirect('/spot');
        })
        .catch(erreur => {
            res.render("testCreate", {createFailed : "Problème avec la création de Spot"});
        });
};


exports.oneSpot = (req, res) => {
    let token = res.app.locals.apiKey;
    let id = req.params.id;

    axios.get(SkiApi + "/ski-spot/" + id, {

            headers: {"Authorization": token}
        })
        .then(resultat => {
            let info = resultat.data.skiSpot;
            res.render("testOneSpot", { info});
        }).catch(erreur => {
            res.render("login");
        });
};

exports.deleteSpot = (req, res) => {
    let token = res.app.locals.apiKey;
    let id = req.params.id;

    axios.delete(SkiApi + "/ski-spot/" + id, {

            headers: {"Authorization": token}
        })
        .then(resultat => {
            res.redirect("/spot");
        }).catch(erreur => {
            res.render({deleteFaile : "Problème dans la suppression du Spot"});
        });
};

exports.error404 = (req, res) => {
    res.render("error404");
};