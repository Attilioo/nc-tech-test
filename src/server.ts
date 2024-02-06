import * as express from "express";

export const app = express();

const { getAllCards } = require("./controllers/cards.controller");

app.set("json spaces", 2);

app.get("/cards", async (req, res) => {
  // respond with a list of cards
  await getAllCards(req, res);
});

app.get("/cards/:cardId/:sizeId?", () => {
  // respond with card by id
});
