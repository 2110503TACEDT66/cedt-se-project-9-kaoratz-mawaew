const request = require("supertest");
const app = require("../server");

describe("Peak Hours", () => {
    it("Return graph data if reservation exist on restaurant", async () => {
      const response = await request("http://localhost:4000").get
        ("/api/v1/reservations/661843d335531f37300652fd/summary")
  
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.count).toBeGreaterThan(0);
      // Add more specific expectations based on your application's logic
    });
  
    it("success but return nothing if reservation not exist on restaurant", async () => {
      const response = await request("http://localhost:4000")
        .get("/api/v1/reservations/6630a0f4204ca9659155c6b9/summary")
  
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.count).toBe(0);
      // Add more specific expectations based on your application's logic
    });

    it("Error case", async () => {
        const response = await request("http://localhost:4000")
          .get("/api/v1/reservations/notId/summary")
    
        expect(response.status).toBe(500);
        expect(response.body.success).toBe(false);
        // Add more specific expectations based on your application's logic
      });
  });