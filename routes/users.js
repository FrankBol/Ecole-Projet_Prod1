const express = require("express");
const router = express.Router();
const controllerRoute = require('./controllerRoute');

router.get("/", controllerRoute.getSpots,controllerRoute.getProfil, controllerRoute.pageSpotsList);
router.get("/:page", controllerRoute.getSpots,controllerRoute.getProfil, controllerRoute.pageSpotsList);

router.get('/users/signup', controllerRoute.pageSignup);
router.post("/users/signup", controllerRoute.postSignup);

router.post("/users/login", controllerRoute.postLogin);

router.get('/users/profil', controllerRoute.getProfil, controllerRoute.pageProfil);

router.get("/spots/create", controllerRoute.pageCreateSpot);
router.post("/spots/create", controllerRoute.postCreateSpot);

router.get('/spots/:id', controllerRoute.getSpotInformation, controllerRoute.pageInformation);

router.get("/spots/update/:id",controllerRoute.getSpotInformation,controllerRoute.getProfil, controllerRoute.pageUpdate);
router.put("/spots/update/:id", controllerRoute.postUpdateSpot);

router.delete("/spots/delete/:id", controllerRoute.deleteSpot);
router.get("/users/logout", controllerRoute.getLogout);

router.get("*", controllerRoute.error404);

module.exports = router;