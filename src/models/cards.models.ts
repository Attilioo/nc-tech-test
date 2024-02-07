import { error } from "console";

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

exports.selectCardById = async (cardId) => {
  const cardsData = await fs.readFile(
    path.join(__dirname, "/../data/cards.json"),
    "utf-8"
  );
  const templatesData = await fs.readFile(
    path.join(__dirname, "/../data/templates.json"),
    "utf-8"
  );
  const sizesData = await fs.readFile(
    path.join(__dirname, "/../data/sizes.json"),
    "utf-8"
  );

  const cards = JSON.parse(cardsData);
  const templates = JSON.parse(templatesData);
  const card = cards.find((chosenCard) => chosenCard.id === cardId);
  if (!card) {
    throw error;
  }

  const availableSizes = card.sizes.map((size) => {
    let title;

    if (size === "sm") title = "Small";
    else if (size === "md") title = "Medium";
    else if (size === "lg") title = "Large";
    else if (size === "gt") title = "Giant";

    return {
      id: size,
      title: title,
    };
  });

  delete card.sizes;
  card.availableSizes = availableSizes;
  const templateReference = templates.find(
    (t) => t.id === card.pages[0].templateId
  );
  card.imageUrl = templateReference.imageUrl;

  return card;
};

exports.insertCard = async (card) => {
  let newCard = card;
  const cardsData = await fs.readFile(
    path.join(__dirname, "/../data/cards.json"),
    "utf-8"
  );

  const cards = JSON.parse(cardsData);

  let nextCardId = cards.length + 1;
  let formattedCardId = String(nextCardId).padStart(3, "0");

  newCard.id = `card${formattedCardId}`;

  cards.push(card);

  await fs.writeFile(
    path.join(__dirname, "/../data/cards.json"),
    JSON.stringify(cards),
    "utf-8"
  );
  return newCard;
};
