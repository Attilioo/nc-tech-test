import * as request from "supertest";
import { app } from "../server";

describe("GET Test /cards", () => {
  test("GET:200 sends an array of cards", async () => {
    const response = await request(app).get("/cards").expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    response.body.forEach((card) => {
      expect(typeof card.title).toBe("string");
      expect(typeof card.card_id).toBe("string");
      expect(typeof card.imageUrl).toBe("string");
    });
  });
});

describe("GET Test /cards/:cardId", () => {
  test("GET: 200 returns a single card with the correct properties", async () => {
    const response = await request(app).get("/cards/card001").expect(200);

    expect(response.body.id).toBe("card001");
    expect(response.body.title).toBe("card 1 title");
    expect(response.body.basePrice).toBe(200);
    expect(response.body.pages).toHaveLength(4);
    expect(response.body.availableSizes).toHaveLength(3);
    expect(response.body.imageUrl).toBe("/front-cover-portrait-1.jpg");
  });

  test("GET: 404 returns a  404 status and error message for a non-existent id", async () => {
    const response = await request(app)
      .get("/cards/non_existent_id")
      .expect(404);

    expect(response.body.message).toBe("Card not found.");
  });
});

describe("POST Test /cards", () => {
  test("POST:  201 inserts a new card", async () => {
    const newCard = {
      title: "Example Title",
      sizes: ["sm", "md", "gt"],
      basePrice: 200,
      pages: [
        {
          title: "Front Cover",
          templateId: "template001",
        },
        {
          title: "Inside Left",
          templateId: "template002",
        },
        {
          title: "Inside Right",
          templateId: "template003",
        },
        {
          title: "Back Cover",
          templateId: "template004",
        },
      ],
    };

    const expectedCard = {
      ...newCard,
      id: "card004",
    };

    const response = await request(app)
      .post("/cards")
      .send(newCard)
      .expect(201);

    expect(response.body.id).toBe(expectedCard.id);
    expect(response.body.title).toBe(expectedCard.title);
    expect(response.body.basePrice).toBe(expectedCard.basePrice);
    expect(response.body.pages).toEqual(expectedCard.pages);
  });
});
