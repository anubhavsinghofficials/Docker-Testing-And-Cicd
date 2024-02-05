import { addTodo, getTodo, removeTodo } from "@src/controllers/todo-controller.js"
import { Router } from "express"

export const todoRouter = Router()

todoRouter.route("/").get(getTodo).post(addTodo)
todoRouter.route("/:id?").delete(removeTodo)
