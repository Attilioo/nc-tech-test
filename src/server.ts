import * as express from "express";
const cors = require("cors");
export const app = express();

const {
  getAllCards,
  getCardById,
  postCard,
} = require("./controllers/cards.controller");

app.set("json spaces", 2);
app.use(cors());
app.use(express.json());

app.get("/cards", async (req, res) => {
  // respond with a list of cards
  await getAllCards(req, res);
});

app.get("/cards/:cardId/:sizeId?", async (req, res) => {
  // respond with card by id

  await getCardById(req, res);
});

app.post("/cards", async (req, res) => {
  await postCard(req, res);
});
