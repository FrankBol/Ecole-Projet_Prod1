const axios = require("axios");
const SkiApi = "https://ski-api.herokuapp.com";

exports.getSignup = (req, res) => {
    res.render('signup');
};

exports.getLogin = (req, res) => {
    res.render('login');
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

        }else{res.render("login");}
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
    .then(resultat => {res.render('login');})

    .catch(erreur => {res.render('errorCreat');});
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
    .catch(erreur => {res.render('errorLogin');});
};

exports.getDeconnexion = (req, res) => {
    res.app.locals.apiKey = "";
    res.render('login');  
};

exports.error404 = (req, res) => {
    res.render("error404")
}