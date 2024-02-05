import Todo from "@src/models/todo-model.js"
import { Request, Response } from "express"

export const getTodo = async (_req: Request, res: Response) => {
  try {
    const toDos = await Todo.find()
    res.status(200).json({ toDos })
  } catch (error) {
    res.status(400).json({ error: error })
  }
}

export const addTodo = async (req: Request, res: Response) => {
  const { text } = req.body
  if (!text) {
    return res.status(400).json({ error: "Provide task" })
  }

  try {
    const { _id } = await Todo.create({ text })
    res.status(201).json({ message: "task added", _id })
  } catch (error) {
    res.status(400).json({ error: error })
  }
}

export const removeTodo = async (req: Request, res: Response) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({ error: "Provide Id" })
  }

  try {
    await Todo.findByIdAndDelete(id)
    res.status(200).json({ message: "task deleted" })
  } catch (error) {
    res.status(400).json({ error: error })
  }
}
