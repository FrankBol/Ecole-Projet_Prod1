const axios = require("axios");
const SkiApi = "https://ski-api.herokuapp.com";

exports.getSignup = (req, res) => {
    res.render('signup');
};

exports.getLogin = (req, res) => {
    res.render('login');
};

exports.getDeconnexion = (req, res) => {
    res.app.locals.apiKey = "";
    res.render('login');  
};

exports.getProfil = (req, res) => {
    if (res.app.locals.apiKey) {
        let token = res.app.locals.apiKey;

        axios.get(SkiApi + "/tokenInfo", {headers: {"Authorization": token}})

            .then(resultat => {
                let data = resultat.data;
                res.render('profil', {name: data.name, email: data.email});

            })
            .catch(() => res.render('login'));

    } else {res.render("login");}
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
    .then(resultat => {res.render('login');})

    .catch(erreur => {
        req.flash("error", `Ce compte existe déjà`);
        res.redirect("/signup");});
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

            res.redirect('/');
        })
        .catch(() => {
            req.flash("error", `Mauvais Mot de Passe ou Email `);
            res.redirect('/');});
};

exports.getSpots = (req, res) => {
    let token = res.app.locals.apiKey;

    axios.get(SkiApi + "/ski-spot", {headers: {"Authorization": token}})
        .then(resultat => {
            spots = resultat.data.skiSpots;

            axios.get(SkiApi + "/tokenInfo", {headers: {"Authorization": token}})
                .then(resultat => {
                    let name = resultat.data.name;

                    res.render('spots_list', { spots, name, deleteFaile : undefined });
                })
        }).catch(erreur => {
            res.render("login");
        });
};

exports.getCreateSpot = (req, res) => {
    let token = res.app.locals.apiKey;
    if(token){
        res.render("spot_creation");
    }
    else{res.render("login");}
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
            res.redirect('/');
        })
        .catch(erreur => {
            req.flash("error", `Une Erreur c'est produite lors de la création de spot `);
            res.redirect("/spots/create");
        });
};


exports.getSpotInformation = (req, res) => {
    let token = res.app.locals.apiKey;
    let id = req.params.id;

    axios.get(SkiApi + "/ski-spot/" + id, {

            headers: {"Authorization": token}
        })
        .then(resultat => {
            let info = resultat.data.skiSpot;
            console.log(resultat);
            res.render("spot_information", { info});
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
            res.redirect("/");
        }).catch(erreur => {
            res.send(erreur);
        });
};
exports.getUpdateSpot = (req, res) => {

    let token = res.app.locals.apiKey;
    let id = req.params.id;

    axios.get(SkiApi + "/ski-spot/" + id,
    
           {headers: {"Authorization": token}})

        .then(resultat => {
            let info = resultat.data.skiSpot;
            res.render("spot_update", {info:info});
        })    
        .catch(erreur => {
             res.send(erreur);
        });
};

exports.postUpdateSpot = (req, res) => {
    let id = req.params.id;
    let token = res.app.locals.apiKey;

    let description = req.body.description;
    let name = req.body.name;
    let address = req.body.address;
    let difficulty = req.body.difficulty;
    let coordinates = req.body.coordinates;
    let tabCoordinates = coordinates.split(",");
    let numberTabCoordinates = tabCoordinates.map( i => Number(i));

    let info = {
        "description": description,
        "name": name,
        "address": address,
        "difficulty": difficulty,
        "coordinates": numberTabCoordinates
    };
    axios.put(SkiApi + "/ski-spot/" + id, 
            info,
    
    { headers: {"Authorization": token}})
    .then(resultat => {
          res.redirect("/"); })
    .catch(erreur => {
        req.flash("error", `Une Erreur c'est produite lors de la modification du spot `);
        res.render("spot_update");
        });
};

exports.error404 = (req, res) => {
    res.render("error404");
};