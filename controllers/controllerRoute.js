const SkiApi = "https://ski-api.herokuapp.com";

exports.signup = (request, response) => {
    response.render('signup');
};

exports.login = (request, response) => {
    response.render('login');
};

exports.profil = (request, response) => {
    response.render('profil');
};

exports.index = (request, response) => {
    response.sendFile('index.html');
};


exports.apiStatus = (request, response) => {
    axios.get(SkiApi+"/status")
    .then(resultat => {
        response.send(resultat.data);
    })
    .catch(erreur => {
        response.send('erreur :' + erreur);
    });
};

exports.apiLogin = (request, response) => {
    axios.get(SkiApi+"/login")
    .then(resultat => {
        response.send(resultat.data);
    })
    .catch(erreur => {
        response.send('erreur :' + erreur);
    });
};

exports.apiLoginPost = (request, response) => {
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
};