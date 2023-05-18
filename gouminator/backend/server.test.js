const request = require("supertest");
const app = require("./server");

describe("GET /", () => {
  it("should return 'Hello, World!'", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Hello, World!");
  });
});

describe("POST /volume", () => {
  it("should calculate the volume for a valid radius", async () => {
    const response = await request(app).post("/volume").send({ radius: 5 });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("volume");
    expect(response.body).toHaveProperty("radius", 5);
  });

  it("should return an error for missing radius", async () => {
    const response = await request(app).post("/volume").send({});
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
  });

  it("should return an error for non-number radius", async () => {
    const response = await request(app).post("/volume").send({ radius: "abc" });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
  });

  it("should return an error for radius greater than or equal to 100", async () => {
    const response = await request(app).post("/volume").send({ radius: 100 });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
  });
});

describe("POST /volumes", () => {
  it("should calculate volumes for an array of radii", async () => {
    const response = await request(app)
      .post("/volumes")
      .send({ radii: [5, 10, 15] });
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(3);
  });

  it("should return an error for missing radii", async () => {
    const response = await request(app).post("/volumes").send({});
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Please provide radii");
  });

  it("should return an error for non-array radii", async () => {
    const response = await request(app).post("/volumes").send({ radii: "abc" });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Please provide an array of radii");
  });
});
