import mongoose, { Document, Model, Schema } from "mongoose"

type TodoType = { text: string }
type TodoDocument = TodoType & Document

const todoSchema: Schema<TodoDocument> = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
})

const Todo: Model<TodoDocument> = mongoose.model("Todo", todoSchema)
export default Todo
