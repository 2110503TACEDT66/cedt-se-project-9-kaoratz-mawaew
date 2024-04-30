const { createRestaurant } = require("../controllers/restaurants");
const Restaurant = require("../models/Restaurant");
const request = require("supertest");
const app = require("../server");

describe("GET /restaurants", () => {
  it("should return restaurants filtered by tags", async () => {
    const response = await request(app)
      .get("/restaurants")
      .query({ tag: "italian,pizza" }) // replace with your desired tags

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.length).toBeGreaterThan(0);
    // Add more specific expectations based on your application's logic
  });

  it("should return all restaurants if no tags are specified", async () => {
    const response = await request(app)
      .get("/restaurants")

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.length).toBeGreaterThan(0);
    // Add more specific expectations based on your application's logic
  });
});