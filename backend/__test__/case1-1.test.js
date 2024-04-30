const request = require("supertest");
const app = require("../server");

describe("Tag and filters", () => {

    it("should return restaurants filtered by tags", async () => {
      const response = await request("http://localhost:4000").get
        ("/api/v1/restaurants")
        .query({ tag: "Italian" }) // replace with your desired tags
  
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.length).toBeGreaterThan(0);
      // Add more specific expectations based on your application's logic
    });
  
    it("should return all restaurants if no tags are specified", async () => {
      const response = await request("http://localhost:4000")
        .get("/api/v1/restaurants")
  
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.length).toBeGreaterThan(0);
      // Add more specific expectations based on your application's logic
    });

    it("Return nothing on Vietnam tag because it has nothing", async () =>{
        const response = await request("http://localhost:4000")
        .get("/api/v1/restaurants")
        .query({tag: "Vietnamese"})

        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(0);
    });


  });