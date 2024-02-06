import * as express from "express";

export const app = express();

app.set("json spaces", 2);

app.get("/cards", async () => {
  // respond with a list of cards
  console.log("success");
});

app.get("/cards/:cardId/:sizeId?", () => {
  // respond with card by id
});
