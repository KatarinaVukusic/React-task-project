const obavezaRouter = require("express").Router();
const Obaveza = require("../models/obaveza");
const Korisnik = require("../models/korisnik");

const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const dohvatiToken = (req) => {
  const auth = req.get("authorization");
  if (auth && auth.toLowerCase().startsWith("bearer")) {
    return auth.substring(7);
  }
  return null;
};

obavezaRouter.get("/", async (req, res) => {
  const obaveza = await Obaveza.find({});
  const ukupno = res.json(obaveza);
});

obavezaRouter.get("/:id", async (req, res) => {
  const obaveza = await Obaveza.findById(req.params.id);
  res.json(obaveza);
});

obavezaRouter.put("/:id", async (req, res) => {
  const podatak = req.body;

  const token = dohvatiToken(req);

  const dekToken = jwt.verify(token, process.env.SECRET);
  if (!token || !dekToken.id) {
    return res.status(401).json({ error: "neispravni ili nepostojeći token" });
  }

  const obaveza = {
    izvrseno: podatak.izvrseno,
  };

  const rez = await Obaveza.findOneAndUpdate(
    {
      _id: mongoose.Types.ObjectId(req.params.id),
      korisnik: mongoose.Types.ObjectId(dekToken.id),
    },
    obaveza,
    { new: true }
  );

  res.json(rez);
});

obavezaRouter.post("/", async (req, res) => {
  const podatak = req.body;
  const token = dohvatiToken(req);

  const dekToken = jwt.verify(token, process.env.SECRET);
  if (!token || !dekToken.id) {
    return res.status(401).json({ error: "neispravni ili nepostojeći token" });
  }

  const vlasnikObaveze = await Korisnik.findById(dekToken.id);

  const novaObaveza = new Obaveza({
    sadrzaj: podatak.sadrzaj,
    datum: podatak.datum,
    vazno: podatak.vazno,
    izvrseno: podatak.izvrseno,
    korisnik: vlasnikObaveze._id,
  });

  const spremljenaObaveza = await novaObaveza.save();
  vlasnikObaveze.obaveze = vlasnikObaveze.obaveze.concat(spremljenaObaveza._id);
  await vlasnikObaveze.save();

  res.json(spremljenaObaveza);
});

obavezaRouter.delete("/:id", async (req, res) => {
  const token = dohvatiToken(req);

  const dekToken = jwt.verify(token, process.env.SECRET);
  if (!token || !dekToken.id) {
    return res.status(401).json({ error: "neispravni ili nepostojeći token" });
  }

  const rez = await Obaveza.findOneAndDelete({
    _id: mongoose.Types.ObjectId(req.params.id),
    korisnik: mongoose.Types.ObjectId(dekToken.id),
  });
  console.log(rez);
  if (rez) res.send(rez);
  else res.status(204).send({ message: "Ne postoji traženi podatak" });
});

module.exports = obavezaRouter;
