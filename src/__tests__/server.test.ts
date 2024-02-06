import * as request from "supertest";
import { app } from "../server";


describe.only("Test /cards", () => {
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

test("returns matching card title", async () => {
  const response = await request(app).get("/cards/card001");

  expect(response.status).toBe(200);
  expect(response.body).toEqual(
    expect.objectContaining({
      title: "card 1 title",
    })
  );
});
