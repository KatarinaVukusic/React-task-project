const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const Korisnik = require("../models/korisnik");

loginRouter.post("/", async (req, res) => {
  const podaci = req.body;

  const korisnik = await Korisnik.findOne({ username: podaci.username });

  const passOK =
    korisnik === null ? false : bcrypt.compare(podaci.pass, korisnik.passHash);

  if (!(korisnik && passOK)) {
    return res.status(401).json({
      error: "neispravni korisnik ili lozinka",
    });
  }

  const userToken = {
    username: korisnik.username,
    id: korisnik._id,
  };

  const token = jwt.sign(userToken, process.env.SECRET);

  res.status(200).send({
    token,
    username: korisnik.username,
  });
});

module.exports = loginRouter;
