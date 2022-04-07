const express = require("express");
const router = express.Router();
const controllerRoute = require('./controllerRoute');


router.get('/users/signup', controllerRoute.getSignup);
router.post("/users/signup", controllerRoute.postSignup);
router.post("/users/login", controllerRoute.postLogin);
router.get('/users/profil', controllerRoute.getProfil);
router.get("/users/logout", controllerRoute.getDeconnexion);



router.get("/spots/create", controllerRoute.getCreateSpot);
router.post("/spots/create", controllerRoute.postCreateSpot);
router.delete("/spots/delete/:id", controllerRoute.deleteSpot);
router.get("/spots/update/:id", controllerRoute.getUpdateSpot);
router.put("/spots/update/:id", controllerRoute.postUpdateSpot);
router.get('/spots/:id', controllerRoute.getSpotInformation);

router.get('/', controllerRoute.getSpots);

router.get("*", controllerRoute.error404);

module.exports = router;