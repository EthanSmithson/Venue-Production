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

    router.get("/getMyPackages/:myCookie", users.getPackages);
  
    app.use('/api/users', router);
  };