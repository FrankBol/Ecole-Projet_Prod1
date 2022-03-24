const express = require("express");
const router = express.Router();
const controllerRoute = require('./controllerRoute');


router.get('/signup', controllerRoute.getSignup);
router.get('/profil', controllerRoute.getProfil);
router.get('/', controllerRoute.getLogin);
router.get("/deconnexion", controllerRoute.getDeconnexion);
router.get("/oneSpot/:id", controllerRoute.oneSpot);

router.post("/signupSubmit", controllerRoute.postSignup);
router.post("/postlogin", controllerRoute.postLogin);


router.get("/spot", controllerRoute.getSpot);
router.get("/createSpot", controllerRoute.getCreateSpot);
router.post("/createSpot", controllerRoute.postCreateSpot);

router.delete("/delete/:id", controllerRoute.deleteSpot);

router.get("*", controllerRoute.error404);

module.exports = router;