const fs = require("fs/promises");
const path = require("path");

exports.selectCards = async () => {
  const cardsData = await fs.readFile(
    path.join(__dirname, "/../data/cards.json"),
    "utf-8"
  );
  const templatesData = await fs.readFile(
    path.join(__dirname, "/../data/templates.json"),
    "utf-8"
  );

  const cards = JSON.parse(cardsData);
  const templates = JSON.parse(templatesData);

  const formattedCards = cards.map((card) => {
    const templateReference = templates.find(
      (t) => t.id === card.pages[0].templateId
    );
    return {
      title: card.title,
      imageUrl: templateReference.imageUrl,
      card_id: card.id,
    };
  });

  return formattedCards;
};
