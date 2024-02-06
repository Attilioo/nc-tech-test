import * as express from "express";

export const app = express();

const { getAllCards, getCardById } = require("./controllers/cards.controller");

app.set("json spaces", 2);

app.get("/cards", async (req, res) => {
  // respond with a list of cards
  await getAllCards(req, res);
});

app.get("/cards/:cardId/:sizeId?", async (req,res) => {
  // respond with card by id

await getCardById(req,res)
});