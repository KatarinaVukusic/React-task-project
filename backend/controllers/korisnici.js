const korisnikRouter = require("express").Router();
const Korisnik = require("../models/korisnik");
const bcrypt = require("bcrypt");

korisnikRouter.get("/", async (req, res) => {
  const korisnici = await Korisnik.find({}).populate("obaveze", {
    sadrzaj: 1,
    datum: 1,
  });

  res.json(korisnici);
});

korisnikRouter.post("/", async (req, res) => {
  const sadrzaj = req.body;

  const runde = 10;
  const passHash = await bcrypt.hash(sadrzaj.pass, runde);

  const korisnik = new Korisnik({
    username: sadrzaj.username,
    ime: sadrzaj.ime,
    passHash: passHash,
  });

  const sprKorisnik = await korisnik.save();
  res.json(sprKorisnik);
});

module.exports = korisnikRouter;
