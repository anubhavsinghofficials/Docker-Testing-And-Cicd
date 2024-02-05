import { app } from "@src/app.js"
import { connectDB } from "@src/config/db-connect.js"
import mongoose from "mongoose"
import SuperTest from "supertest"

beforeAll(async () => {
  await connectDB()
})

afterAll(async () => {
  await mongoose.connection.close()
})

describe("Todo", () => {
  let _id: string
  const superRequest = SuperTest(app)

  describe("GET /api/v1/todo", () => {
    it("should return an array of todos", async () => {
      const response = await superRequest.get("/api/v1/todo")
      expect(response.statusCode).toBe(200)
      expect(response.body.toDos).toBeInstanceOf(Array)
      if (response.body.toDos.length > 0) {
        const sampleItem = response.body.toDos[0]
        expect(typeof sampleItem._id).toBe("string")
        expect(typeof sampleItem.text).toBe("string")
      }
    })
  })

  describe("POST /api/v1/todo", () => {
    describe("given: text not provided", () => {
      it("should return a 400", async () => {
        const response = await superRequest.post("/api/v1/todo")
        expect(response.statusCode).toBe(400)
        expect(response.body).toMatchObject({
          error: expect.any(String),
        })
      })
    })

    describe("given: text is provided", () => {
      it("should add task & return status 200", async () => {
        const response = await superRequest
          .post("/api/v1/todo")
          .send({ text: "test text" })
        expect(response.statusCode).toBe(201)
        expect(response.body).toMatchObject({
          message: expect.any(String),
          _id: expect.any(String),
        })
        _id = response.body._id
      })
    })
  })

  describe("DELETE /api/v1/todo", () => {
    describe("given: id not provided", () => {
      it("should return a 400", async () => {
        const response = await superRequest.delete(`/api/v1/todo`)
        expect(response.statusCode).toBe(400)
        expect(response.body).toMatchObject({
          error: expect.any(String),
        })
      })
    })

    describe("given: id is provided", () => {
      it("should delete task & return status 200", async () => {
        const response = await superRequest.delete(`/api/v1/todo/${_id}`)
        expect(response.statusCode).toBe(200)
        expect(response.body).toMatchObject({
          message: expect.any(String),
        })
      })
    })
  })
})
