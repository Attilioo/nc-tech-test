const { selectCards, selectCardById } = require("../models/cards.models");

exports.getAllCards = async (req, res) => {
  try {
    const cards = await selectCards();
    res.status(200).send(cards);
  } catch (err) {
    res
      .status(500)
      .send({ message: "An error occurred while fetching cards." });
  }
};

exports.getCardById = async (req, res) => {
  const cardId = req.params.cardId;
  try {
    const chosenCard = await selectCardById(cardId);
    res.status(200).send(chosenCard);
  } catch (err) {
    res.status(404).send({ message: "Card not found." });
  }
};
