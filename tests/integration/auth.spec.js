const request = require("supertest");
const app = require("../../app");

describe("POST /api/v1/login Tests", () => {
  test("test email belum terdaftar", async () => {
    const response = await request(app)
      .post("/api/v1/login")
      .send({ email: "userdummy@mail.com", password: "users123" });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      status: false,
      message: "Email unregistered",
      data: null,
    });
  });

  test("test email sudah sesuai, password salah", async () => {
    const response = await request(app)
      .post("/api/v1/login")
      .send({ email: "usertest2@mail.com", password: "absjdhc" });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      status: false,
      message: "Invalid email or password",
      data: null,
    });
  });

  test("test email dan password benar", async () => {
    const response = await request(app)
      .post("/api/v1/login")
      .send({ email: "usertest2@mail.com", password: "password123" });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: true,
      message: "User logged in successfully",
      data: expect.any(String), // Token should be returned
    });
  });
});
