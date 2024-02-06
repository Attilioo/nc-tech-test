const { selectCards } = require("../models/cards.models");

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
