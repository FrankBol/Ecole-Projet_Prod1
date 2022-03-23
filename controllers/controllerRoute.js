const axios = require("axios");
const SkiApi = "https://ski-api.herokuapp.com";

exports.getSignup = (req, res) => {
    res.render('signup', {
        signupFaile: undefined
    });
};

exports.getLogin = (req, res) => {
    res.render('login', {
        loginFaile: undefined
    });
};

exports.getCreateSpot = (req, res) => {
    let token = res.app.locals.apiKey;
    if(token){
        res.render("creeSpot", { createFaile : undefined });
    }
    else{res.render("login", { loginFaile : undefined });}
};

exports.getDeconnexion = (req, res) => {
    res.app.locals.apiKey = "";
    res.render('login', {
        loginFaile: undefined
    });
};

exports.getProfil = (req, res) => {
    if (res.app.locals.apiKey) {
        let token = res.app.locals.apiKey;

        axios.get(SkiApi + "/tokenInfo", {

                headers: {"Authorization": token}
            })
            .then(resultat => {
                let data = resultat.data;
                res.render('profil', {
                    "name": data.name,
                    "email": data.email
                });
            })
            .catch(erreur => res.render('login', {loginFaile: undefined}));
    } else {
        res.render("login", {loginFaile: undefined});
    }
};

exports.postSignup = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let name = req.body.name;
    axios.post(SkiApi + "/signup", {
            "email": email,
            "password": password,
            "name": name
        })
        .then(resultat => {
            res.render('login');
        })
        .catch(erreur => {
            res.render("signup", {
                signupFaile: "Compte déjas existant"
            });
        });
};

exports.postLogin = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    axios.post(SkiApi + "/login", {
            "email": email,
            "password": password,
        })
        .then(resultat => {
            let data = resultat.data;
            res.app.locals.apiKey = data.token;

            res.render('profil', {
                name: data.name,
                email: data.email
            });
        })
        .catch(erreur => {
            res.render('login', {
                loginFaile: "Mauvais Mot de Passe ou Email"
            });
        });
};


exports.getSpot = (req, res) => {
    let token = res.app.locals.apiKey;

    axios.get(SkiApi + "/ski-spot", {

            headers: {"Authorization": token}
        })
        .then(resultat => {
            spots = resultat.data.skiSpots;

            axios.get(SkiApi + "/tokenInfo", {

                    headers: {"Authorization": token}
                })
                .then(resultat => {
                    let name = resultat.data.name;

                    res.render('spot', { spots, name, deleteFaile : undefined });
                })
        }).catch(erreur => {
            res.render("login", { loginFaile: undefined });
        });
};

exports.postCreateSpot = (req, res) => {
    let token = res.app.locals.apiKey;
    let description = req.body.description;
    let name = req.body.name;

    axios.post(SkiApi + "/ski-spot", {

            "description": description,
            "name": name,
            "address": "test",
            "difficulty": "facile",
            "coordinates": [1, 2]
        }, 

        {headers: {"Authorization": token,}})

        .then(resultat => {
            res.redirect('/spot');
        })
        .catch(erreur => {
            res.render("creeSpot", {createFaile : "Problème avec la création de Spot"});
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