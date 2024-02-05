import path from "path"
import dotenv from "dotenv"
// import { fileURLToPath } from "url"
// import { dirname } from "path"
// const __filename = fileURLToPath(import.meta.url)
// const __dirname = dirname(__filename)
import * as currentPath from "./dirname.cts"
// const currentPath = require("./dirname.cts")
const dirname = (currentPath as { default: string }).default
dotenv.config({ path: path.join(dirname, "../.env") })

import express from "express"
import cors from "cors"
import { todoRouter } from "./routes/todo-route.js"

export const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/v1/todo", todoRouter)
