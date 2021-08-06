module.exports = app => {
  const auth = require("../controller/auth.controller");

  var router = require("express").Router();

  // First Route Path of All Api's.
  app.use('/api/auth', router);

  // Register a new User
  router.post("/register", auth.register);

  // Login a Existing User
  router.post("/login", auth.login);

  // Logout a Existing User
  router.post("/logout", auth.logout);

  // Retrieve all register Users
  router.get("/", auth.findAll);

};