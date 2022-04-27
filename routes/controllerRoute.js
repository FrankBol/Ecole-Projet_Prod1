const axios = require("axios");
const SkiApi = "https://ski-api.herokuapp.com";

module.exports = {

    pageSpotsList : (req, res) => {
        res.render('spots_list');
    },

    pageSignup : (req, res) => {
        res.render('signup');
    },

    pageProfil : (req, res) => {
        res.render('profil');
    },

    pageCreateSpot : (req, res) => {
        res.render('spot_creation');
    },

    pageInformation : (req, res) => {
        res.render('spot_information');
    },

    pageUpdate : (req, res) => {
        res.render('spot_update');
    },

    getLogout : (req, res) => {
        res.app.locals.apiKey = "";
        res.redirect("/");
    },

    postSignup : (req, res) => {
        let infoSignup = req.body;
    
        axios.post(SkiApi + "/signup", infoSignup )
        .then( () => res.redirect("/"))
    
        .catch(erreur => {
            req.flash("error", `Ce compte existe déjà`);
            res.redirect("/users/signup");
        });
    },

    postLogin : (req, res) => {
        let infoLogin = req.body;
    
        axios.post(SkiApi + "/login", infoLogin)
            .then(resultat => {
                res.app.locals.apiKey = resultat.data.token;
                res.redirect('/');
            })
            .catch(() => {
                req.flash("error", `Mauvais Mot de Passe ou Email`);
                res.redirect('/');
            });
    },

    getProfil : (req, res, next) => {
        let token = res.app.locals.apiKey;  

        axios.get(SkiApi + "/tokenInfo", {headers: {"Authorization": token}})
        .then(resultat => {
            res.app.locals.infoProfil = resultat.data;
            next();
        })
        .catch(() => {res.redirect("/");});
    },

    getSpots : (req, res, next) => {
        let token = res.app.locals.apiKey;  
        let page = req.query.page;
        if (page==undefined) page=1;
    
        axios.get(SkiApi + `/ski-spot?limit=6&page=${page}`, {headers: {"Authorization": token}})
            .then(resultat => {
                res.locals.spots = resultat.data.skiSpots;
                res.locals.totalPages = resultat.data.totalPages;
                res.locals.page = page;
                next();

            }).catch(() => {
                res.render("login");
            });
    },
        
     postCreateSpot : (req, res) => {
        let token = res.app.locals.apiKey;
        let infoCreate = req.body;
    
        let coordinates =  req.body.coordinates;
        let tabCoordinates = coordinates.split(",");
        let numberTabCoordinates = tabCoordinates.map( i => Number(i));
    
        axios.post(SkiApi + "/ski-spot", {
                ...infoCreate,
                "coordinates": numberTabCoordinates
            }, 
            {headers: {"Authorization": token}})
    
            .then(() => res.redirect('/'))
            .catch(() => {
                req.flash("error", `Impossible de créer le spot`);
                res.redirect("/spots/create");
            });
    },
    getSpotInformation : (req, res, next) => {
        let token = res.app.locals.apiKey;
        let id = req.params.id;
    
        axios.get(SkiApi + "/ski-spot/" + id, {headers: {"Authorization": token}})
            .then(resultat => {
                res.app.locals.info = resultat.data.skiSpot;
                next();
            })
            .catch(() => {res.redirect("/");});
    },
    postUpdateSpot : (req, res) => {
        let token = res.app.locals.apiKey;
        let id = req.params.id;
    
        let infoUpdate = req.body;
        let coordinates = req.body.coordinates;
        let tabCoordinates = coordinates.split(",");
        let numberTabCoordinates = tabCoordinates.map( i => Number(i));
    
        let info = {
            ...infoUpdate,
            "coordinates": numberTabCoordinates
        };
        axios.put(SkiApi + "/ski-spot/" + id, info, { headers: {"Authorization": token} })
        .then(() => {res.redirect("/"); })
        .catch(() => {
            req.flash("error", `Une Erreur c'est produite lors de la modification du spot `);
            res.redirect("/spots/update/" + id);
            });
    },
    deleteSpot : (req, res) => {
        let token = res.app.locals.apiKey;
        let id = req.params.id;
    
        axios.delete(SkiApi + "/ski-spot/" + id, {headers: {"Authorization": token} })
            .then(() => res.redirect("/"))
            
            .catch(() => {
            req.flash("error", `Le Spot n'a pu être supprimé `);
            res.redirect("/");
            });
    },
/***********************************3eme livraison**************************************/
    getUser : (req, res, next) => {
             let token = res.app.locals.apiKey;  

            axios.get(SkiApi + "/user", {headers: {"Authorization": token}})

            .then(resultat => {
             res.app.locals.infoUser = resultat.data;
             next();
         })
            .catch(() => {res.redirect("/users/profil");});

    },
    deleteFriend : (req, res) => {
         let token = res.app.locals.apiKey;
         let id = req.params.id;

         axios.delete(SkiApi + "/friend/" + id, {headers: {"Authorization": token} })

        .then(() => res.redirect("/users/profil"))
        .catch(() => {

            req.flash("error", `L'ami n'a pu être supprimé `);
            res.redirect("/users/profil");
         });

    },
    postFriend : (req, res) => {
         let token = res.app.locals.apiKey;
         let id = req.params.id;

        axios.get(SkiApi + "/friend/"+ id, {headers: {"Authorization": token}})

        .then(resultat => {  // TODO : à continuer//
             res.app.locals.infoUser = resultat.data.friend;
            })
        .catch(() => {res.redirect("/users/profil");});

    },
    getSearch : (req, res) => {
        let token = res.app.locals.apiKey;
        let words = req.params.words;

        axios.get(SkiApi + "/users/search/"+words, {headers: {"Authorization": token}})

        .then(resultat => { 
            res.locals.users = resultat.data.users; // TODO : à compléter
             // -- EXEMPLES : LA LISTE EST VIDE --

            // { "message": "SEARCH_COMPLETED_SUCCESSFULLY",
            //     "users": []// }
            // -- LA LISTE NON VIDE --
            // {
            //     "message": "SEARCH_COMPLETED_SUCCESSFULLY",
            //     "users": [
            //         {
            //             "id": "621a65359afc3b0004aaf044",
            //             "name": "william garneau"
            //         },
            //         {
            //             "id": "621a659a9afc3b0004aaf049",
           //             "name": "Will"  //         }, ...
 })
        .catch(() => {

            req.flash("error", `L'ami n'a pas été trouvé `);
            res.redirect("/users/search/");
         });

    },
    error404 : (req, res) => {
        res.render("error404");
    },
};
