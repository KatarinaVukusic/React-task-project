const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const mongoose = require("mongoose");
const obavezaRouter = require("./controllers/obaveze");
const korisnikRouter = require("./controllers/korisnici");
const loginRouter = require("./controllers/login");

logger.info("Spajam se na", config.DB_URI);

mongoose
  .connect(config.DB_URI)
  .then((result) => {
    logger.info("Spojeni smo na bazu");
  })
  .catch((error) => {
    logger.greska("Greška pri spajanju", error.message);
  });

app.use(cors());
app.use(express.json());
app.use(middleware.zahtjevInfo);

app.use("/api/obaveze", obavezaRouter);
app.use("/api/korisnici", korisnikRouter);
app.use("/api/login", loginRouter);

app.use(middleware.nepoznataRuta);
app.use(middleware.errorHandler);

module.exports = app;
