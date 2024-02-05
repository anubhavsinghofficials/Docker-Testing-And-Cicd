import { app } from "./app.js"
import { connectDB } from "./config/db-connect.js"

connectDB()

export const server = app.listen(8000, () => {
  console.log("Listening at 8000")
})

// we kept this execution of starting server function & the
// connection to database function in this separate file, ie,
// server.ts (and ran src/server.ts instead of app.ts)
// The reason is that when we do testing, we gotta import the
// app (for the supertest), but if the server & connectDb call
// are present in the same file, they will get executed during
// this process, thus just keep them separate and when testing,
// no need to start server & connect to database in the
// tests itself if needed
