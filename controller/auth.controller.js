const db = require("../models/index.js"); // models path depend on your structure
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
// require('dotenv').config();

const Register = db.UserRegister;
const Login = db.UserLogin;

// Register User
exports.register = async (req, res) => {
  if (!req.body.email) {
    res.status(400).send({
      message: "Email can not be empty!"
    });
    return;
  }

  const { firstName,lastName, email } = req.body
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const register = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: hashPassword,
  };

  Register.findOne({ where: { email: req.body.email } }).then(user => {
    if (!user) {
      Register.create(register)
        .then(user => {
          res.status(200).send(user)
        })
        .catch(err => {
          res.send(400).send(err)
        })
    } else {
      res.status(422).send({ message: "USER ALREADY EXISTS" })
    }
  })
    .catch(err => {
      res.status(500).send(err)
    })
}

// Login User
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const userWithEmail = await Login.findOne({ where: { email: email } }).catch(err => {
    console.log("Error", err);
  });
  if (!userWithEmail) {
    return res.status(400).send({ message: "Email does not match" });
  }

  const passwordIsValid = await bcrypt.compare(password, userWithEmail.password)
  if (!passwordIsValid) {
    return res.status(400).send({ auth: false, accessToken:null, message: "Invalid password!" });
  }

// create JWT-TOKEN
  const jwtToken = jwt.sign({
    id: userWithEmail.id, email: userWithEmail.email
  }, process.env.JWT_SECRET)

  res.json({ auth: true, accessToken: jwtToken })
}

//logout user
exports.logout = (req, res) => {
  res.redirect('/');
  return res.json("logout");
}

// Get all register user
exports.findAll = (req, res) => {

  Register.findAll().then(data => {
    res.send(data);
  }).catch(err => {
    res.status(422).json({ message: "Some error occurred while retrieving User details." });
  });
};
