module.exports = app => {
    const users = require("../controllers/users.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/register", users.create);
  
    // Retrieve all Tutorials
    router.get("/", users.findAll);

      // Retrieve a single Tutorial with id
    router.get("/find/:email", users.findOne);

    router.get("/login/:email/:password", users.loginUser);

    router.get("/login/:email", users.confirmed);

    router.get("/confirmed/:email", users.emailConfirmed);

    router.post("/passwordChange", users.changePassword);

    router.post("/createPackage", users.createPackage);

    router.get("/getId/:myCookie", users.findId);

    router.post("/getMyVenues", users.getVenues);

    router.get("/trackMyPackages", users.trackPackages);

    router.post("/createTracking", users.createTracking);

    router.get("/getSlug/:trackingNumber", users.getSlug);

    router.get("/getMe/:myCookie", users.getMe);

    router.post("/removePackage", users.removePackage);

    router.post("/geoHash", users.geoHashing);

    router.post("/getMyVenuesEvents", users.getMyVenuesEvents);

    router.post("/getEventDetails", users.getEventDetails);

    router.get("/getMyId/:myCookie", users.getMyId);

    router.post("/saveEvent", users.saveEvent);

    router.post("/removeEvent", users.removeEvent);
    
    router.get("/getSavedEvents/:myCookie", users.getSavedEvents);

    router.get("/getSavedEvent/:userId/:eventId", users.getSavedEvent);
    
    router.get("/getMySavedEvents/:userId", users.getMySavedEvents);

    router.get("/searchForEvents/:searchKey", users.searchForEvents);

    router.get("/getProfileData/:searchKey", users.getProfileData);

    router.post("/updateProfile", users.updateProfile);

    router.post("/uploadProfileImageToDb", users.uploadProfileImageToDb);
  
    app.use('/api/users', router);
  };