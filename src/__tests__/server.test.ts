import * as request from "supertest";
import { app } from "../server";

describe("Test /cards", () => {
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

describe("Test /cards/:cardId", () => {
  test("returns a single card with the correct properties", async () => {
    const response = await request(app).get("/cards/card001").expect(200);

    expect(response.body.id).toBe("card001");
    expect(response.body.title).toBe("card 1 title");
    expect(response.body.basePrice).toBe(200);
    expect(response.body.pages).toHaveLength(4);
    expect(response.body.availableSizes).toHaveLength(3);
    expect(response.body.imageUrl).toBe("/front-cover-portrait-1.jpg");
  });

  test("returns a  404 status and error message for a non-existent id", async () => {
    const response = await request(app)
      .get("/cards/non_existent_id")
      .expect(404);

    expect(response.body.message).toBe("Card not found.");
  });
});

// test("returns matching card title", async () => {
//   const response = await request(app).get("/cards/card001");

//   expect(response.status).toBe(200);
//   expect(response.body).toEqual(
//     expect.objectContaining({
//       title: "card 1 title",
//     })
//   );
// });
