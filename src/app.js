'use strict';

const request = require('request');
const express = require('express');
const bodyParser = require('body-parser');
const pokeFinder = require('./service/pokemonFinder');
let app = express();

if (!process.env.TELEGRAM_BOT_TOKEN)
  throw  new Error(`You must provide TELEGRAM_BOT_TOKEN`);
if (!process.env.PORT)
  throw new Error(`You must provide PORT`);

pokeFinder.initPokeIo((err, pokeIo) => {
  if (err)
    return err;
});

let bot = require('./service/mapBot');

app.use(bodyParser.json());
app.get(`/`, (req, res) => {
  res.redirect(`http://telegram.me/PokeMapGoBot`);
});
app.post(`/${process.env.TELEGRAM_BOT_TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});
app.listen(process.env.PORT, () => {
  console.log(`Server started on ${process.env.PORT}`);
});

module.exports = app;
